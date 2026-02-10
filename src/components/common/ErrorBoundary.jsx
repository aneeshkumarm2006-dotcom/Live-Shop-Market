import { Component } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Button from './Button';

/**
 * ErrorBoundary — catches unhandled React errors and shows a friendly fallback.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <App />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Only log in development; send to error reporting service in production
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <main role="alert" className="min-h-screen flex items-center justify-center bg-bg-light p-6">
          <div className="max-w-md w-full text-center">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center mb-6">
              <HiOutlineExclamationCircle className="w-10 h-10 text-error" />
            </div>

            {/* Heading */}
            <h1 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold text-text-heading mb-3">
              Something went wrong
            </h1>

            {/* Message */}
            <p className="text-text-secondary text-sm md:text-base mb-8">
              An unexpected error occurred. Please try again or return to the homepage.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="primary" size="lg" onClick={this.handleReset}>
                Try Again
              </Button>
              <Button
                as={Link}
                to="/"
                variant="secondary"
                size="lg"
                onClick={this.handleReset}
              >
                Back to Home
              </Button>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
