import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import classnames from 'classnames';
import { HiEye, HiEyeOff, HiBell } from 'react-icons/hi';
import { useAuth } from '@context/AuthContext';
import { Button, Input, LoadingSpinner } from '@components/common';
import { useToastContext } from '@components/common/Toast';
import { ROUTES } from '@utils/constants';
import { getDemoCredentials } from '@data/mockAuth';

// ─── Floating Notification Bubble ────────────────────────────────────
function NotificationBubble() {
  return (
    <div className="absolute top-6 left-4 right-4 md:top-8 md:left-6 md:right-auto md:max-w-[280px] z-10">
      <div className="bg-white rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
            <HiBell className="w-4 h-4 text-white" />
          </div>
        </div>
        <p className="text-xs leading-snug text-text-primary">
          <span className="font-semibold">Sephora&apos;s &quot;Spring Skincare&quot;</span>{' '}
          exclusive livestream is starting in{' '}
          <span className="font-bold">5 minutes</span>.{' '}
          <span className="font-bold text-primary underline cursor-pointer">Join Live.</span>
        </p>
      </div>
    </div>
  );
}

// ─── Demo Credentials Hint ───────────────────────────────────────────
function DemoHints({ onFill }) {
  const creds = getDemoCredentials();

  return (
    <div className="mt-6 p-4 bg-bg-lighter rounded-2xl border border-border-light">
      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
        Demo Accounts
      </p>
      <div className="space-y-2">
        {creds.map((c) => (
          <button
            key={c.email}
            type="button"
            onClick={() => onFill(c.email, c.password)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white border border-border-light hover:border-primary hover:shadow-sm transition-all duration-200 cursor-pointer group"
          >
            <div className="text-left">
              <span className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                {c.email}
              </span>
              <span className="block text-xs text-text-light capitalize">{c.userType}</span>
            </div>
            <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Use →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
//  LOGIN PAGE
// ═════════════════════════════════════════════════════════════════════
export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');
  const { toast } = useToastContext();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: { email: '', password: '' },
  });

  // ── Fill demo credentials ──────────────────────────────────
  const fillCredentials = (email, password) => {
    setValue('email', email, { shouldValidate: true });
    setValue('password', password, { shouldValidate: true });
    setServerError('');
  };

  // ── Submit Handler ─────────────────────────────────────────
  const onSubmit = (data) => {
    setServerError('');
    const result = login(data.email, data.password);

    if (result.success) {
      toast.success('Welcome back!');
      navigate(ROUTES.HOME);
    } else {
      setServerError(result.error);
      toast.error(result.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-bg-white">
      {/* ═══════════════════════════════════════════════════════
          MOBILE HERO IMAGE
          ═══════════════════════════════════════════════════════ */}
      <div className="block lg:hidden relative w-full h-[180px] sm:h-[240px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-amber-200 to-yellow-100" />
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-400/30" />
        <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-red-400/20" />
        <div className="absolute top-1/2 right-8 w-16 h-16 rounded-full bg-green-400/25" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-56">
          <div className="w-full h-full bg-gradient-to-t from-amber-600/80 to-amber-400/60 rounded-t-full" />
        </div>
        <NotificationBubble />
      </div>

      {/* ═══════════════════════════════════════════════════════
          LEFT COLUMN — FORM
          ═══════════════════════════════════════════════════════ */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-10 md:px-12 lg:px-16 xl:px-20">
        <div className="w-full max-w-[440px]">
          {/* ── Heading ──────────────────────────────────── */}
          <div className="mb-8 lg:mb-10">
            <h1 className="text-[22px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-extrabold leading-tight text-text-heading font-[var(--font-heading)]">
              Welcome back to your{' '}
              <span className="inline-block mt-1">
                <span className="relative inline-block px-1">
                  <span className="absolute inset-0 bg-accent rounded-sm -skew-x-1" />
                  <span className="relative font-extrabold">live shopping</span>
                </span>
              </span>{' '}
              <span>experience!</span>
            </h1>
          </div>

          {/* ── Server Error ─────────────────────────────── */}
          {serverError && (
            <div className="mb-5 px-4 py-3 rounded-[var(--radius-input)] bg-red-50 border border-red-200 text-sm text-error font-medium" role="alert">
              {serverError}
            </div>
          )}

          {/* ── Form ─────────────────────────────────────── */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Email */}
            <Input
              label="Your Email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
            />

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-text-primary"
                >
                  Password<span className="text-error ml-0.5">*</span>
                </label>
                <button
                  type="button"
                  className="text-xs font-medium text-primary hover:text-primary-dark transition-colors cursor-pointer"
                  onClick={() => toast.info('Password reset is not available in this demo.')}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={classnames(
                    'w-full h-12',
                    'bg-bg-input',
                    'border border-border-input',
                    'rounded-[var(--radius-input)]',
                    'text-base text-text-primary',
                    'font-[var(--font-primary)]',
                    'transition-all duration-150 ease-in-out',
                    'outline-none',
                    'pl-4 pr-12',
                    'placeholder:text-text-light',
                    'focus:border-border-focus focus:shadow-[var(--shadow-input-focus)]',
                    errors.password && '!border-error !focus:border-error !focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]'
                  )}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-text-light hover:text-text-secondary transition-colors duration-150 focus:outline-none"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <HiEyeOff className="w-5 h-5" />
                  ) : (
                    <HiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-error mt-0.5 pl-1" role="alert">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="xl"
              fullWidth
              disabled={isSubmitting}
              className="mt-3 text-base font-bold tracking-wide"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <LoadingSpinner size="small" light />
                  Logging in…
                </span>
              ) : (
                'Log In'
              )}
            </Button>
          </form>

          {/* ── Sign Up Link ──────────────────────────────── */}
          <p className="mt-6 text-center text-sm text-text-secondary">
            Don&apos;t have an account?{' '}
            <Link
              to={ROUTES.SIGN_UP}
              className="font-semibold text-primary hover:text-primary-dark underline underline-offset-2 transition-colors"
            >
              Sign up
            </Link>
          </p>

          {/* ── Demo Credentials ──────────────────────────── */}
          <DemoHints onFill={fillCredentials} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          RIGHT COLUMN — HERO IMAGE (desktop only)
          ═══════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-amber-200 to-yellow-100" />

        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-orange-400/30 blur-sm" />
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-red-400/20 blur-sm" />
        <div className="absolute bottom-20 right-16 w-28 h-28 rounded-full bg-green-400/25 blur-sm" />
        <div className="absolute bottom-40 left-20 w-20 h-20 rounded-full bg-pink-400/20" />
        <div className="absolute top-40 right-1/3 w-14 h-14 rounded-full bg-orange-500/20" />

        <div className="absolute top-16 right-12">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-500 rotate-12 shadow-lg" />
        </div>
        <div className="absolute bottom-32 left-16">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-lg" />
        </div>
        <div className="absolute top-1/3 left-8">
          <div className="w-8 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 -rotate-12 shadow-lg" />
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[75%] flex items-end justify-center">
          <div className="relative w-full max-w-[380px] h-full">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-[90%] bg-gradient-to-t from-amber-700/70 via-amber-500/50 to-transparent rounded-t-[120px]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-[55%] bg-gradient-to-t from-amber-500/80 to-yellow-400/60 rounded-t-[80px]" />
          </div>
        </div>

        <NotificationBubble />
      </div>
    </div>
  );
}
