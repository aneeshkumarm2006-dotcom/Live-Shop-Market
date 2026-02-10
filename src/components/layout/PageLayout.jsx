import Header from './Header';
import Footer from './Footer';
import PageTransition from '@components/common/PageTransition';

/**
 * PageLayout — wraps every page with Header + Footer.
 *
 * Props:
 *   - children     : page content
 *   - showHeader   : boolean (default true)
 *   - showFooter   : boolean (default true)
 *   - className    : optional extra classes on <main>
 *   - fullWidth    : if true, skip the inner container (page manages its own width)
 */
export default function PageLayout({
  children,
  showHeader = true,
  showFooter = true,
  className = '',
  fullWidth = false,
}) {
  return (
    <div className="flex min-h-screen flex-col bg-bg-white">
      {showHeader && <Header />}

      <main
        id="main-content"
        className={`flex-1 ${className}`}
      >
        <PageTransition>
          {children}
        </PageTransition>
      </main>

      {showFooter && <Footer />}
    </div>
  );
}
