import { useParams } from 'react-router-dom';
import { PageLayout } from '@components/layout';

export default function CategoryBannerPage() {
  const { slug } = useParams();

  return (
    <PageLayout>
      <section className="container-app py-12">
        <h1 className="text-3xl font-bold mb-4 capitalize">
          {slug?.replace(/-/g, ' ')} — Banner
        </h1>
        <p className="text-text-secondary">Category banner page — coming soon</p>
      </section>
    </PageLayout>
  );
}
