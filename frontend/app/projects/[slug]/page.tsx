'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, ExternalLink, Apple, Smartphone, Globe, Github } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectImage from '@/components/ProjectImage';
import { translations, Language } from '@/lib/translations';
import { getProjectBySlug } from '@/lib/projectsData';
import Cookies from 'js-cookie';

const HexagonBackground = dynamic(() => import('@/components/HexagonBackground'), {
  ssr: false,
});

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const [lang, setLang] = useState<Language>('tr');
  const [mounted, setMounted] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    setLang((Cookies.get('locale') || 'tr') as Language);
    setMounted(true);
  }, []);

  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!mounted) return null;

  if (!project) {
    return (
      <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
        <HexagonBackground />
        <Header />
        <section className="relative container mx-auto px-4 py-24 z-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Proje bulunamadı</h1>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-trustworthy-blue hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Projelere dön
          </Link>
        </section>
        <Footer />
      </main>
    );
  }

  const t = translations[lang];
  const pt = t.projects;
  const isWeb = project.type === 'web';
  const orientation = isWeb ? 'landscape' : 'portrait';

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      <HexagonBackground />
      <Header />

      <article className="relative container mx-auto px-4 py-12 md:py-20 z-20">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-trustworthy-blue transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {pt.backToProjects}
        </Link>

        {/* Header: title, meta */}
        <header className="mb-10 md:mb-14">
          <span className="text-sm font-medium text-trustworthy-blue dark:text-blue-300 uppercase tracking-wider">
            {isWeb ? 'Web Projesi' : 'Mobil Uygulama'}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            {project.shortDescription}
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-500 dark:text-gray-500">
            {project.year && (
              <span className="flex items-center gap-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">{pt.year}:</span>
                {project.year}
              </span>
            )}
            {project.client && (
              <span className="flex items-center gap-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">{pt.client}:</span>
                {project.client}
              </span>
            )}
          </div>
        </header>

        {/* Gallery – ana görsel + grid */}
        {project.images.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{pt.gallery}</h2>
            <div className="space-y-6">
              {/* Ana görsel (seçilen veya ilk) – mobilde yükseklik sınırına göre tam boy gösterilir */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-gray-900/50">
                {isWeb ? (
                  <div className="relative w-full aspect-video max-h-[70vh]">
                    <ProjectImage
                      src={project.images[galleryIndex] ?? project.images[0]!}
                      alt={`${project.title} - ${galleryIndex + 1}`}
                      orientation="landscape"
                      className="w-full"
                      sizes="100vw"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center p-2 md:p-4">
                    <div className="relative h-[85vh] aspect-[9/16] w-auto max-w-full overflow-hidden rounded-xl">
                      <ProjectImage
                        src={project.images[galleryIndex] ?? project.images[0]!}
                        alt={`${project.title} - ${galleryIndex + 1}`}
                        orientation="portrait"
                        sizes="(max-width: 480px) 100vw, 400px"
                        fillContainer
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* Küçük grid – tıklanınca ana görsel değişir */}
              {project.images.length > 1 && (
                <div
                  className={`grid gap-3 ${
                    isWeb
                      ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                      : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5'
                  }`}
                >
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setGalleryIndex(idx)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                        galleryIndex === idx
                          ? 'border-trustworthy-blue ring-2 ring-trustworthy-blue/30'
                          : 'border-transparent hover:border-gray-300 dark:hover:border-white/20'
                      } ${isWeb ? 'aspect-video' : 'aspect-[9/16] max-h-32'}`}
                    >
                      <ProjectImage
                        src={img}
                        alt=""
                        orientation={orientation}
                        className="w-full h-full"
                        sizes="150px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Açıklama + meta + linkler */}
        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {project.tech && project.tech.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-2">
                  {pt.tech}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((techName) => (
                    <span
                      key={techName}
                      className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 text-sm font-medium"
                    >
                      {techName}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Store / Live links */}
            <div className="flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-trustworthy-blue text-white hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  <Globe className="w-4 h-4" />
                  {pt.liveSite}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.appStoreUrl && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 hover:opacity-90 transition-opacity font-medium text-sm"
                >
                  <Apple className="w-4 h-4" />
                  {pt.appStore}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.playStoreUrl && (
                <a
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition-colors font-medium text-sm border border-gray-200 dark:border-white/10"
                >
                  <Smartphone className="w-4 h-4" />
                  {pt.playStore}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 hover:opacity-90 transition-opacity font-medium text-sm"
                >
                  <Github className="w-4 h-4" />
                  {pt.github}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
