import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineHome, HiOutlineArrowLeft } from 'react-icons/hi';
import { PageLayout } from '@components/layout';
import { Button } from '@components/common';
import { ROUTES } from '@utils/constants';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <section className="container-app flex flex-col items-center justify-center py-20 sm:py-28 text-center min-h-[60vh]">
        {/* Large 404 display */}
        <div className="relative mb-6">
          <span aria-hidden="true" className="text-[120px] sm:text-[160px] md:text-[200px] font-extrabold leading-none text-primary/10 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-primary">
              404
            </span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl font-bold text-text-heading mb-3">
          Page Not Found
        </h1>

        {/* Message */}
        <p className="text-text-secondary text-sm md:text-base max-w-md mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Button
            as={Link}
            to={ROUTES.HOME}
            variant="primary"
            size="lg"
            icon={<HiOutlineHome className="w-4 h-4" />}
          >
            Back to Home
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate(-1)}
            icon={<HiOutlineArrowLeft className="w-4 h-4" />}
          >
            Go Back
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
