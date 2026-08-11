const subscriptionWelcomeHtml = `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:24px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 28px rgba(99,102,241,0.15);">

            <!-- Gradient header -->
            <tr>
              <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%);padding:26px 28px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:21px;font-weight:700;letter-spacing:-0.3px;">
                  Welcome to {{appName}} 🎉
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:24px 28px 4px;">
                <p style="margin:0 0 14px;color:#475569;font-size:14px;line-height:1.6;">
                  Thanks for subscribing with
                  <strong style="color:#1e293b;">{{email}}</strong>.
                  You'll now get the latest market updates and insights
                  straight to your inbox — no noise, just the good stuff.
                </p>

                <!-- CTA button -->
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
                  <tr>
                    <td style="border-radius:10px;background:linear-gradient(135deg,#6366f1,#8b5cf6);">
                      <a href="{{clientUrl}}" style="display:inline-block;padding:11px 26px;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:10px;">
                        Explore the dashboard →
                      </a>
                    </td>
                  </tr>
                </table>

                <!-- Compact feature row -->
                <p style="margin:0 0 4px;color:#94a3b8;font-size:12px;">
                  📈 Live data &nbsp;·&nbsp; 🔔 Instant alerts &nbsp;·&nbsp; 🔒 Secure
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px;">
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;" />
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:0 28px 20px;text-align:center;">
                <p style="margin:0 0 2px;color:#94a3b8;font-size:11px;line-height:1.5;">
                  If you didn't sign up for this, you can safely ignore this email.
                </p>
                <p style="margin:0;color:#cbd5e1;font-size:11px;">
                  © {{year}} {{appName}}. All rights reserved.
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const subscriptionWelcomeText = `Hi there,

Thanks for subscribing with {{email}}. You'll now receive our latest market updates straight to your inbox.

Visit: {{clientUrl}}

If you didn't sign up for this, you can safely ignore this email.

© {{year}} {{appName}}`;

module.exports = [
  {
    key: "SUBSCRIPTION_WELCOME",
    name: "Subscription Welcome Email",
    subject: "You're subscribed! 🎉",
    text: subscriptionWelcomeText,
    html: subscriptionWelcomeHtml,
    isActive: true,
  },
];
