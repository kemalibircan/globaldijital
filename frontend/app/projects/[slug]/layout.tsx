import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/siteConfig';
import { getProjectBySlug } from '@/lib/projectsData';

type Props = { params: Promise<{ slug: string }>; children: React.ReactNode };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = getBaseUrl();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return { title: 'Proje bulunamadı' };
  }

  const title = project.title;
  const description = project.shortDescription || project.description.slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title: `${title} | GlobalDijital Projeler`,
      description,
      url: `${baseUrl}/projects/${project.slug}`,
      type: 'article',
      images: project.images?.length
        ? [{ url: `${baseUrl}${project.images[0]}`, width: 1200, height: 630, alt: title }]
        : undefined,
    },
    alternates: { canonical: `${baseUrl}/projects/${project.slug}` },
  };
}

export default function ProjectSlugLayout({ children }: Props) {
  return children;
}
