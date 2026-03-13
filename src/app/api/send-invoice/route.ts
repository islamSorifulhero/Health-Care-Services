import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { booking, userEmail, userName } = await req.json();

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  body { font-family: 'Georgia', serif; background: #FAF7F2; margin: 0; padding: 20px; }
  .container { max-width: 580px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; }
  .header { background: linear-gradient(135deg, #4A6B52, #7C9A85); padding: 36px 32px; text-align: center; }
  .header h1 { color: white; font-size: 28px; margin: 0 0 4px; }
  .header p { color: rgba(255,255,255,0.8); margin: 0; font-size: 14px; }
  .body { padding: 32px; }
  .greeting { font-size: 18px; color: #2C2C2C; margin-bottom: 8px; }
  .subtitle { color: #6B6B6B; font-size: 14px; margin-bottom: 24px; }
  .invoice-box { background: #FAF7F2; border-radius: 12px; padding: 24px; margin-bottom: 24px; }
  .invoice-box h3 { font-size: 14px; color: #6B6B6B; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px; }
  .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #E8E4DE; font-size: 14px; }
  .row:last-child { border-bottom: none; font-size: 16px; font-weight: bold; }
  .row .label { color: #6B6B6B; }
  .row .value { color: #2C2C2C; }
  .total-row .value { color: #7C9A85; font-size: 20px; }
  .status { display: inline-block; background: rgba(201,168,76,0.15); color: #9A7A1A; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .cta { text-align: center; margin: 24px 0; }
  .cta a { background: #7C9A85; color: white; text-decoration: none; padding: 14px 32px; border-radius: 30px; font-weight: 600; font-size: 15px; }
  .footer { background: #1A1A1A; padding: 20px 32px; text-align: center; color: rgba(255,255,255,0.5); font-size: 12px; }
  .service-icon { font-size: 48px; text-align: center; padding: 16px 0 8px; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>Care.xyz</h1>
    <p>Booking Confirmation & Invoice</p>
  </div>
  <div class="body">
    <div class="service-icon">${booking.serviceIcon}</div>
    <p class="greeting">Hello ${userName || userEmail.split('@')[0]},</p>
    <p class="subtitle">Your booking has been confirmed. Here is your invoice summary.</p>

    <div class="invoice-box">
      <h3>Invoice #${booking.id}</h3>
      <div class="row"><span class="label">Service</span><span class="value">${booking.serviceName}</span></div>
      <div class="row"><span class="label">Duration</span><span class="value">${booking.duration}</span></div>
      <div class="row"><span class="label">Location</span><span class="value">${booking.city}, ${booking.district}, ${booking.division}</span></div>
      <div class="row"><span class="label">Address</span><span class="value">${booking.address}</span></div>
      <div class="row"><span class="label">Booking Date</span><span class="value">${booking.createdAt}</span></div>
      <div class="row"><span class="label">Status</span><span class="value"><span class="status">⏳ ${booking.status}</span></span></div>
      <div class="row"><span class="label">Rate × Days</span><span class="value">৳${booking.ratePerDay.toLocaleString()} × ${booking.days}</span></div>
      <div class="row"><span class="label">Platform Fee</span><span class="value">৳${booking.platformFee}</span></div>
      <div class="row total-row"><span class="label">Total Amount</span><span class="value">৳${booking.total.toLocaleString()}</span></div>
    </div>

    <div class="cta">
      <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/my-bookings">View My Bookings →</a>
    </div>

    <p style="color:#6B6B6B;font-size:13px;line-height:1.7;">If you have any questions, feel free to contact our support team. We're always here to help ensure you get the best care for your family.</p>
  </div>
  <div class="footer">
    © 2025 Care.xyz • Made with ❤️ in Bangladesh<br/>
    This is an automated invoice email.
  </div>
</div>
</body>
</html>
    `;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_FROM || `Care.xyz <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: `✅ Booking Confirmed – ${booking.serviceName} | ${booking.id}`,
        html: emailHtml,
      });
    } else {
      console.log(`[INVOICE] Email would be sent to: ${userEmail}`);
      console.log(`[INVOICE] Booking ID: ${booking.id}, Total: ৳${booking.total}`);
    }

    return NextResponse.json({ success: true, message: 'Invoice sent' });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json({ success: false, error: 'Failed to send invoice' }, { status: 500 });
  }
}
