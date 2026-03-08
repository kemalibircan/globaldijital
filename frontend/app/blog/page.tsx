import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { allBlogPosts, blogCategories, formatBlogDate } from '@/lib/blogData';
import { absoluteUrl, siteName } from '@/lib/siteConfig';

const pageTitle = 'Blog';
const pageDescription =
  'SEO, web sitesi, mobil uygulama, e ticaret ve dijital buyume konularinda 25 SEO odakli blog yazisi.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    'SEO blog',
    'web sitesi blog yazilari',
    'dijital pazarlama blogu',
    'mobil uygulama blogu',
    'e ticaret SEO',
  ],
  alternates: {
    canonical: absoluteUrl('/blog'),
  },
  openGraph: {
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    url: absoluteUrl('/blog'),
    type: 'website',
    images: [
      {
        url: absoluteUrl('/logos/light-mode-logo.png'),
        width: 1200,
        height: 630,
        alt: `${siteName} Blog`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | ${siteName}`,
    description: pageDescription,
    images: [absoluteUrl('/logos/light-mode-logo.png')],
  },
};

export default function BlogPage() {
  const featuredPosts = allBlogPosts.slice(0, 3);
  const categoryCounts = blogCategories
    .map((category) => ({
      category,
      count: allBlogPosts.filter((post) => post.category === category).length,
    }))
    .sort((left, right) => right.count - left.count);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteName} Blog`,
    url: absoluteUrl('/blog'),
    description: pageDescription,
    inLanguage: 'tr-TR',
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/logos/only-logo.png'),
      },
    },
    blogPost: allBlogPosts.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      description: post.description,
    })),
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),_transparent_28%)]" />
      <Header />

      <section className="relative container mx-auto px-4 py-20 z-20">
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-trustworthy-blue dark:border-blue-400/30 dark:bg-blue-500/10 dark:text-blue-200">
            SEO odakli 25 blog yazisi
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl">
            Blog
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Web sitesi, SEO, mobil uygulama, e ticaret ve dijital buyume
            konularinda arama niyetine gore kurgulanmis rehberler.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Toplam yazi</p>
            <p className="mt-2 text-3xl font-bold">{allBlogPosts.length}</p>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Kategori</p>
            <p className="mt-2 text-3xl font-bold">{blogCategories.length}</p>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Odak</p>
            <p className="mt-2 text-xl font-bold">SEO + donusum + guven</p>
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 pb-16 z-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">One cikan yazilar</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Hizmet, SEO ve dijital buyume niyetini en iyi karsilayan secili rehberler.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-[28px] border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-trustworthy-blue hover:shadow-xl dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="rounded-full bg-gray-100 px-3 py-1 dark:bg-white/10">
                  {post.category}
                </span>
                <span>{formatBlogDate(post.publishedAt)}</span>
              </div>
              <h3 className="mt-5 text-2xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-trustworthy-blue dark:text-white">
                {post.title}
              </h3>
              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between text-sm font-medium text-trustworthy-blue">
                <span>{post.readingTime} dk okuma</span>
                <span>Yaziyi oku</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative container mx-auto px-4 pb-16 z-20">
        <div className="rounded-[32px] border border-gray-200 bg-gray-50 p-8 dark:border-white/10 dark:bg-white/5">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Kategori dagilimi</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Blog alanini yalnizca trafik degil, ticari niyet ve sektorel arama ihtiyaclarina gore kurduk.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex rounded-full bg-trustworthy-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Hizmetleri incele
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {categoryCounts.map(({ category, count }) => (
              <div
                key={category}
                className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-200"
              >
                {category} - {count} yazi
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 pb-20 z-20">
        <div className="mb-8">
          <h2 className="text-2xl font-bold md:text-3xl">Tum yazilar</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Her yazi; title, description, H yapisi, FAQ ve ic link mantigiyla SEO odakli olarak hazirlandi.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {allBlogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-[28px] border border-gray-200 bg-white/95 p-7 shadow-sm transition-colors hover:border-trustworthy-blue dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span className="rounded-full border border-gray-200 px-3 py-1 dark:border-white/10">
                  {post.category}
                </span>
                <span>{formatBlogDate(post.publishedAt)}</span>
                <span>{post.readingTime} dk</span>
              </div>

              <h3 className="mt-5 text-xl font-bold leading-8 text-gray-900 dark:text-white">
                <Link href={`/blog/${post.slug}`} className="hover:text-trustworthy-blue transition-colors">
                  {post.title}
                </Link>
              </h3>

              <p className="mt-4 min-h-[96px] leading-7 text-gray-600 dark:text-gray-300">
                {post.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {[post.focusKeyword, ...post.secondaryKeywords.slice(0, 2)].map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-trustworthy-blue dark:bg-blue-500/10 dark:text-blue-200"
                  >
                    {keyword}
                  </span>
                ))}
              </div>

              <div className="mt-6">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex text-sm font-semibold text-trustworthy-blue hover:text-blue-700"
                >
                  Devam et
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
