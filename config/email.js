const nodemailer = require("nodemailer");

// Create transporter using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
};

// Send reply email to user
const sendReplyEmail = async ({ to, userName, originalMessage, replyMessage, companyName = "DSF Digital Agency" }) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"${companyName}" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: `Balasan dari ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Balasan dari ${companyName}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4; padding: 20px 0;">
          <tr>
            <td align="center">
              <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px;">${companyName}</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    <p style="color: #333333; font-size: 16px; margin: 0 0 20px;">
                      Halo <strong>${userName}</strong>,
                    </p>
                    
                    <p style="color: #555555; font-size: 14px; margin: 0 0 20px;">
                      Terima kasih telah menghubungi kami. Berikut adalah balasan dari tim kami:
                    </p>
                    
                    <!-- Reply Box -->
                    <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 20px 0; border-radius: 0 8px 8px 0;">
                      <p style="color: #333333; font-size: 15px; margin: 0; line-height: 1.6;">
                        ${replyMessage.replace(/\n/g, '<br>')}
                      </p>
                    </div>
                    
                    <!-- Original Message -->
                    <p style="color: #888888; font-size: 12px; margin: 30px 0 10px;">
                      Pesan asli Anda:
                    </p>
                    <div style="background-color: #f1f1f1; padding: 15px; border-radius: 8px;">
                      <p style="color: #666666; font-size: 13px; margin: 0; font-style: italic;">
                        "${originalMessage}"
                      </p>
                    </div>
                    
                    <p style="color: #555555; font-size: 14px; margin: 30px 0 0;">
                      Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk membalas email ini.
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #eeeeee;">
                    <p style="color: #888888; font-size: 12px; margin: 0;">
                      © ${new Date().getFullYear()} ${companyName}. All rights reserved.
                    </p>
                    <p style="color: #888888; font-size: 12px; margin: 10px 0 0;">
                      Email ini dikirim secara otomatis, namun Anda dapat membalas langsung.
                    </p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = {
  sendReplyEmail,
};
