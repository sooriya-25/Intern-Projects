import { Link } from "react-router-dom";

// Shared shell for every auth screen (Login, Signup, Forgot Password).
//
// Layout contract:
//   - The outer wrapper is pinned to the viewport height (`h-screen`) with
//     `overflow-hidden`, so the *page* never scrolls.
//   - The form column has a fixed header/footer and a middle region that is
//     `overflow-y-auto` — if a form (e.g. the full signup details form)
//     grows taller than the available space, that middle region scrolls on
//     its own instead of pushing the page around.
const AuthLayout = ({
  eyebrow,
  title,
  subtitle,
  children,
  panelWidthClassName = "max-w-md",
}) => {
  return (
    <div className="h-screen w-full overflow-hidden flex bg-[#eaf4ff]">
      {/* Branding panel — decorative, hidden on small screens */}
      <div className="hidden lg:flex lg:w-[42%] xl:w-[38%] relative overflow-hidden bg-gradient-to-br from-ink-900 via-surge-600 to-surge-500">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl animate-blobSpin" />
        <div className="absolute bottom-[-6rem] right-[-4rem] w-96 h-96 rounded-full bg-white/10 blur-3xl animate-floatSlow" />

        <div className="relative z-10 flex flex-col justify-between p-6 xl:p-14 text-white h-full">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <span className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center font-display font-bold">
              SP
            </span>
            <span className="font-display font-semibold text-lg tracking-tight">
              StockPro
            </span>
          </Link>

          <div className="animate-fadeInUp">
            <h2 className="font-display text-3xl xl:text-4xl font-bold leading-tight mb-4">
              Markets move fast.
              <br />
              Stay a step ahead.
            </h2>
            <p className="text-white/75 max-w-sm leading-relaxed">
              Track your portfolio, watch stocks in real time, and manage it
              all from one clean dashboard built for people who don't like
              wasting time.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-white/85">
              {[
                "Real-time price tracking & watchlists",
                "Role-based team access",
                "Secure, verified sign-in",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} StockPro. All rights reserved.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col h-full min-w-0">
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center px-5 sm:px-8 py-5">
            <div className={`w-full ${panelWidthClassName}`}>
              <div className="mb-5">
                {eyebrow && (
                  <span className="inline-block text-xs font-semibold tracking-wide uppercase text-surge-500 bg-surge-50 rounded-full px-3 py-1 mb-2">
                    {eyebrow}
                  </span>
                )}

                <h1 className="font-display text-xl sm:text-3xl font-bold text-ink-900">
                  {title}
                </h1>

                {subtitle && (
                  <p className="text-slate-500 mt-1 text-sm sm:text-base">
                    {subtitle}
                  </p>
                )}
              </div>

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
