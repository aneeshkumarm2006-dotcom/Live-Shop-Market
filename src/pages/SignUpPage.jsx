import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import classnames from 'classnames';
import { HiBell } from 'react-icons/hi';
import { useAuth } from '@context/AuthContext';
import { Button, Input, LoadingSpinner } from '@components/common';
import { useToastContext } from '@components/common/Toast';
import { ROUTES } from '@utils/constants';

// ─── Gender & Age Options ────────────────────────────────────────────
const GENDER_OPTIONS = [
  { value: '', label: 'Input Text' },
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const AGE_OPTIONS = [
  { value: '', label: 'Input Text' },
  { value: '18-24', label: '18–24' },
  { value: '25-34', label: '25–34' },
  { value: '35-44', label: '35–44' },
  { value: '45-54', label: '45–54' },
  { value: '55+', label: '55+' },
];

// ─── Floating Notification Bubble ────────────────────────────────────
function NotificationBubble() {
  return (
    <div className="absolute top-6 left-4 right-4 md:top-8 md:left-6 md:right-auto md:max-w-[280px] z-10">
      <div className="bg-white rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3">
        {/* Bell Icon */}
        <div className="shrink-0 mt-0.5">
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
            <HiBell className="w-4 h-4 text-white" />
          </div>
        </div>
        {/* Text */}
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

// ─── Select Component (matches Input pill styling) ───────────────────
function SelectField({
  label,
  name,
  options,
  error,
  required,
  register,
  validation,
  wrapperClassName,
}) {
  return (
    <div className={classnames('flex flex-col gap-1.5', wrapperClassName)}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-text-primary"
        >
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}
      <select
        id={name}
        {...register(name, validation)}
        className={classnames(
          'w-full h-12',
          'bg-bg-input',
          'border border-border-input',
          'rounded-[var(--radius-input)]',
          'text-base text-text-primary',
          'font-[var(--font-primary)]',
          'transition-all duration-150 ease-in-out',
          'outline-none',
          'px-4',
          'appearance-none',
          'bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%236B7280%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E")]',
          'bg-[length:16px_16px] bg-[position:right_16px_center] bg-no-repeat',
          'focus:border-border-focus focus:shadow-[var(--shadow-input-focus)]',
          error && '!border-error !focus:border-error !focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]',
          'cursor-pointer'
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-error mt-0.5 pl-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
//  SIGN UP PAGE
// ═════════════════════════════════════════════════════════════════════
export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME, { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const { toast } = useToastContext();

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      mobile: '',
      gender: '',
      age: '',
    },
  });

  // ── Submit Handler ─────────────────────────────────────────
  const onSubmit = (data) => {
    const result = signup(data);

    if (result.success) {
      toast.success('Account created successfully!');
      setTimeout(() => {
        navigate(ROUTES.HOME);
      }, 1200);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col lg:flex-row bg-bg-white">
        {/* ═══════════════════════════════════════════════════════
            MOBILE HERO IMAGE (shown above form on mobile)
            ═══════════════════════════════════════════════════════ */}
        <div className="block lg:hidden relative w-full h-[200px] sm:h-[280px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-amber-200 to-yellow-100" />
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-400/30" />
          <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-red-400/20" />
          <div className="absolute top-1/2 right-8 w-16 h-16 rounded-full bg-green-400/25" />
          {/* Person placeholder */}
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
                Sign up and get access{' '}
                <span className="block">to your favorite brands&apos;</span>
                <span className="inline-block mt-1">
                  <span
                    className="relative inline-block px-1"
                  >
                    <span className="absolute inset-0 bg-accent rounded-sm -skew-x-1" />
                    <span className="relative font-extrabold">live shopping</span>
                  </span>
                </span>{' '}
                <span>experiences!</span>
              </h1>
            </div>

            {/* ── Form ─────────────────────────────────────── */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              {/* Email */}
              <Input
                label="Your Email"
                type="email"
                placeholder="Input Text"
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

              {/* Mobile Number */}
              <Input
                label="Your Mobile Number"
                type="tel"
                placeholder="Input Text"
                autoComplete="tel"
                required
                error={errors.mobile?.message}
                {...register('mobile', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^[+]?[\d\s()-]{7,15}$/,
                    message: 'Please enter a valid phone number',
                  },
                })}
              />

              {/* Gender & Age — side by side */}
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="Your Gender"
                  name="gender"
                  options={GENDER_OPTIONS}
                  error={errors.gender?.message}
                  required
                  register={register}
                  validation={{ required: 'Gender is required' }}
                />
                <SelectField
                  label="Your Age"
                  name="age"
                  options={AGE_OPTIONS}
                  error={errors.age?.message}
                  required
                  register={register}
                  validation={{ required: 'Age is required' }}
                />
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
                    Creating Account…
                  </span>
                ) : (
                  'Create My Account'
                )}
              </Button>
            </form>

            {/* ── Login Link ──────────────────────────────── */}
            <p className="mt-6 text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link
                to={ROUTES.LOGIN}
                className="font-semibold text-primary hover:text-primary-dark underline underline-offset-2 transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            RIGHT COLUMN — HERO IMAGE (desktop only)
            ═══════════════════════════════════════════════════════ */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-300 via-amber-200 to-yellow-100" />

          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-orange-400/30 blur-sm" />
          <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-red-400/20 blur-sm" />
          <div className="absolute bottom-20 right-16 w-28 h-28 rounded-full bg-green-400/25 blur-sm" />
          <div className="absolute bottom-40 left-20 w-20 h-20 rounded-full bg-pink-400/20" />
          <div className="absolute top-40 right-1/3 w-14 h-14 rounded-full bg-orange-500/20" />

          {/* 3D Decorative shapes */}
          <div className="absolute top-16 right-12">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-red-500 rotate-12 shadow-lg" />
          </div>
          <div className="absolute bottom-32 left-16">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-lg" />
          </div>
          <div className="absolute top-1/3 left-8">
            <div className="w-8 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 -rotate-12 shadow-lg" />
          </div>

          {/* Person illustration placeholder */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[75%] flex items-end justify-center">
            <div className="relative w-full max-w-[380px] h-full">
              {/* Person silhouette */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-[90%] bg-gradient-to-t from-amber-700/70 via-amber-500/50 to-transparent rounded-t-[120px]" />
              {/* Yellow shirt area */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-[55%] bg-gradient-to-t from-amber-500/80 to-yellow-400/60 rounded-t-[80px]" />
            </div>
          </div>

          {/* Notification Bubble */}
          <NotificationBubble />
        </div>
      </div>
    </>
  );
}
