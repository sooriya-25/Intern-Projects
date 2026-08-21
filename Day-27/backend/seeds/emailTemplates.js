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

const signupOtpHtml = `
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
                  Verify your email
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:24px 28px 4px;">
                <p style="margin:0 0 18px;color:#475569;font-size:14px;line-height:1.6;">
                  Use the code below to verify your email and finish creating
                  your {{appName}} account. This code expires in
                  {{minutes}} minutes.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;width:100%;">
                  <tr>
                    <td align="center" style="border-radius:10px;background:#f1f5f9;padding:16px;">
                      <span style="font-size:32px;font-weight:700;letter-spacing:8px;color:#1e293b;">{{otp}}</span>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 4px;color:#94a3b8;font-size:12px;">
                  If you didn't request this, you can safely ignore this email.
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

const signupOtpText = `Verify your email

Use this code to verify your email and finish creating your {{appName}} account: {{otp}}

This code expires in {{minutes}} minutes. If you didn't request this, you can safely ignore this email.

© {{year}} {{appName}}`;

const passwordResetOtpHtml = `
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
                  Reset your password
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:24px 28px 4px;">
                <p style="margin:0 0 18px;color:#475569;font-size:14px;line-height:1.6;">
                  Use the code below to reset your {{appName}} account
                  password. This code expires in {{minutes}} minutes.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;width:100%;">
                  <tr>
                    <td align="center" style="border-radius:10px;background:#f1f5f9;padding:16px;">
                      <span style="font-size:32px;font-weight:700;letter-spacing:8px;color:#1e293b;">{{otp}}</span>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 4px;color:#94a3b8;font-size:12px;">
                  If you didn't request a password reset, you can safely
                  ignore this email — your password won't change.
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

const loginOtpHtml = `
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
                  Confirm it's you
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:24px 28px 4px;">
                <p style="margin:0 0 18px;color:#475569;font-size:14px;line-height:1.6;">
                  Use the code below to finish logging in to your
                  {{appName}} account. This code expires in
                  {{minutes}} minutes.
                </p>

                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;width:100%;">
                  <tr>
                    <td align="center" style="border-radius:10px;background:#f1f5f9;padding:16px;">
                      <span style="font-size:32px;font-weight:700;letter-spacing:8px;color:#1e293b;">{{otp}}</span>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 4px;color:#94a3b8;font-size:12px;">
                  If you didn't try to log in, you should change your
                  password as soon as possible.
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

const loginOtpText = `Confirm it's you

Use this code to finish logging in to your {{appName}} account: {{otp}}

This code expires in {{minutes}} minutes. If you didn't try to log in, you should change your password as soon as possible.

© {{year}} {{appName}}`;

const passwordResetOtpText = `Reset your password

Use this code to reset your {{appName}} account password: {{otp}}

This code expires in {{minutes}} minutes. If you didn't request this, you can safely ignore this email — your password won't change.

© {{year}} {{appName}}`;

const accountDeletedHtml = `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:24px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 12px 28px rgba(15,23,42,0.12);">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#ef4444 0%,#f97316 100%);padding:26px 28px;text-align:center;">
                <h1 style="margin:0;color:#ffffff;font-size:21px;font-weight:700;letter-spacing:-0.3px;">
                  Account Deleted
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:24px 28px 4px;">
                <p style="margin:0 0 14px;color:#475569;font-size:14px;line-height:1.6;">
                  A user permanently deleted their {{appName}} account.
                </p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
                  <tr>
                    <td style="padding:14px 16px;">
                      <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:0.4px;">Name</p>
                      <p style="margin:0 0 12px;color:#1e293b;font-size:14px;font-weight:600;">{{userName}}</p>
                      <p style="margin:0 0 4px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:0.4px;">Email</p>
                      <p style="margin:0;color:#1e293b;font-size:14px;font-weight:600;">{{userEmail}}</p>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 4px;color:#94a3b8;font-size:12px;">
                  This account and its data have been removed and cannot be recovered.
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px;">
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0;" />
              </td>
            </tr>

            <tr>
              <td style="padding:0 28px 20px;text-align:center;">
                <p style="margin:0;color:#cbd5e1;font-size:11px;">
                  © {{year}} {{appName}}
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const accountDeletedText = `Account deleted

A user permanently deleted their {{appName}} account.

Name: {{userName}}
Email: {{userEmail}}

This account and its data have been removed and cannot be recovered.

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
  {
    key: "SIGNUP_OTP",
    name: "Signup Email Verification OTP",
    subject: "Your verification code",
    text: signupOtpText,
    html: signupOtpHtml,
    isActive: true,
  },
  {
    key: "PASSWORD_RESET_OTP",
    name: "Password Reset OTP",
    subject: "Your password reset code",
    text: passwordResetOtpText,
    html: passwordResetOtpHtml,
    isActive: true,
  },
  {
    key: "LOGIN_OTP",
    name: "Login Verification OTP",
    subject: "Your login code",
    text: loginOtpText,
    html: loginOtpHtml,
    isActive: true,
  },
  {
    key: "ACCOUNT_DELETED",
    name: "Account Deleted (Admin Notification)",
    subject: "A user account was deleted",
    text: accountDeletedText,
    html: accountDeletedHtml,
    isActive: true,
  },
];
