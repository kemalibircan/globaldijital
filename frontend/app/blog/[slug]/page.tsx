import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  allBlogPosts,
  formatBlogDate,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from '@/lib/blogData';
import { absoluteUrl, siteName } from '@/lib/siteConfig';

type PageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Yazi bulunamadi',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: post.title,
    description: post.description,
    keywords: [post.focusKeyword, ...post.secondaryKeywords, post.category],
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      title: `${post.title} | ${siteName} Blog`,
      description: post.description,
      url: absoluteUrl(`/blog/${post.slug}`),
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [siteName],
      section: post.category,
      tags: [post.focusKeyword, ...post.secondaryKeywords],
      images: [
        {
          url: absoluteUrl('/logos/light-mode-logo.png'),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | ${siteName} Blog`,
      description: post.description,
      images: [absoluteUrl('/logos/light-mode-logo.png')],
    },
  };
}

export default function BlogDetailPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug);
  const canonicalUrl = absoluteUrl(`/blog/${post.slug}`);
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      inLanguage: 'tr-TR',
      articleSection: post.category,
      wordCount: post.wordCount,
      keywords: [post.focusKeyword, ...post.secondaryKeywords],
      mainEntityOfPage: canonicalUrl,
      author: {
        '@type': 'Organization',
        name: siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/logos/only-logo.png'),
        },
      },
      image: [absoluteUrl('/logos/light-mode-logo.png')],
      url: canonicalUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Ana Sayfa',
          item: absoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: absoluteUrl('/blog'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: canonicalUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.13),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.08),_transparent_24%)]" />
      <Header />

      <section className="relative container mx-auto px-4 py-16 z-20">
        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/blog" className="hover:text-trustworthy-blue transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span>{post.category}</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-blue-50 px-4 py-2 font-medium text-trustworthy-blue dark:bg-blue-500/10 dark:text-blue-200">
              {post.focusKeyword}
            </span>
            <span className="rounded-full border border-gray-200 px-4 py-2 text-gray-600 dark:border-white/10 dark:text-gray-300">
              {formatBlogDate(post.publishedAt)}
            </span>
            <span className="rounded-full border border-gray-200 px-4 py-2 text-gray-600 dark:border-white/10 dark:text-gray-300">
              {post.readingTime} dk okuma
            </span>
          </div>

          <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            {post.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {post.secondaryKeywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-gray-200 px-3 py-2 text-sm text-gray-600 dark:border-white/10 dark:text-gray-300"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative container mx-auto px-4 pb-20 z-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <article className="rounded-[32px] border border-gray-200 bg-white/95 p-8 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-10">
            <div className="rounded-3xl bg-gray-50 p-6 dark:bg-white/5">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-trustworthy-blue">
                Ozet
              </p>
              <p className="mt-3 text-lg leading-8 text-gray-700 dark:text-gray-300">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-10 space-y-10">
              {post.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-2xl font-bold md:text-3xl">{section.heading}</h2>
                  <div className="mt-5 space-y-5">
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-base leading-8 text-gray-700 dark:text-gray-300"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.items && section.items.length > 0 ? (
                    <ul className="mt-6 space-y-3">
                      {section.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <section id="sss" className="mt-12 scroll-mt-28">
              <h2 className="text-2xl font-bold md:text-3xl">Sik sorulan sorular</h2>
              <div className="mt-6 space-y-4">
                {post.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-6 dark:border-white/10 dark:bg-white/5"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="mt-3 leading-7 text-gray-700 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 rounded-[28px] bg-trustworthy-blue p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                Sonraki adim
              </p>
              <h2 className="mt-3 text-2xl font-bold">
                Bu konuyu isletmeniz icin uygulamak istiyorsaniz
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-blue-50">
                SEO, web sitesi ve donusum optimizasyonunu birlikte ele alan bir yapi
                kurmak daha hizli sonuc verir. Icerik tarafini teknik altyapi ve CTA
                planlamasi ile desteklemek gerekir.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-trustworthy-blue transition-colors hover:bg-blue-50"
                >
                  Hizmetleri incele
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Iletisime gec
                </Link>
              </div>
            </section>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[28px] border border-gray-200 bg-white/95 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-trustworthy-blue">
                Icindekiler
              </p>
              <div className="mt-5 space-y-3">
                {post.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 transition-colors hover:border-trustworthy-blue hover:text-trustworthy-blue dark:border-white/10 dark:text-gray-300"
                  >
                    {section.heading}
                  </a>
                ))}
                <a
                  href="#sss"
                  className="block rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-700 transition-colors hover:border-trustworthy-blue hover:text-trustworthy-blue dark:border-white/10 dark:text-gray-300"
                >
                  Sik sorulan sorular
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white/95 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-trustworthy-blue">
                Hizli notlar
              </p>
              <div className="mt-5 space-y-4 text-sm text-gray-700 dark:text-gray-300">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Kategori</p>
                  <p className="mt-1 font-semibold">{post.category}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Guncelleme</p>
                  <p className="mt-1 font-semibold">{formatBlogDate(post.updatedAt)}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Kelime sayisi</p>
                  <p className="mt-1 font-semibold">{post.wordCount}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-gray-200 bg-white/95 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-trustworthy-blue">
                Kontrol listesi
              </p>
              <ul className="mt-5 space-y-3">
                {post.checklist.map((item) => (
                  <li
                    key={item}
                    className="rounded-2xl bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-700 dark:bg-white/5 dark:text-gray-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="relative container mx-auto px-4 pb-20 z-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Benzer yazilar</h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Ayni niyet kumesinde yer alan veya bu yaziyi destekleyen diger rehberler.
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-semibold text-trustworthy-blue hover:text-blue-700"
            >
              Tum blogu gor
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.slug}
                className="rounded-[28px] border border-gray-200 bg-white/95 p-7 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="rounded-full border border-gray-200 px-3 py-1 dark:border-white/10">
                    {relatedPost.category}
                  </span>
                  <span>{relatedPost.readingTime} dk</span>
                </div>
                <h3 className="mt-5 text-xl font-bold leading-8 text-gray-900 dark:text-white">
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="hover:text-trustworthy-blue transition-colors"
                  >
                    {relatedPost.title}
                  </Link>
                </h3>
                <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
                  {relatedPost.excerpt}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
