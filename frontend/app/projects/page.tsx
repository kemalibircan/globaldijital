'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Globe, Smartphone, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectImage from '@/components/ProjectImage';
import { translations, Language } from '@/lib/translations';
import { allProjects, type Project, type ProjectType } from '@/lib/projectsData';
import Cookies from 'js-cookie';

const HexagonBackground = dynamic(() => import('@/components/HexagonBackground'), {
  ssr: false,
});

export default function ProjectsPage() {
  const [lang, setLang] = useState<Language>('tr');
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState<ProjectType | 'all'>('all');

  useEffect(() => {
    setLang((Cookies.get('locale') || 'tr') as Language);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const t = translations[lang];
  const pt = t.projects;

  const filtered =
    filter === 'all'
      ? allProjects
      : allProjects.filter((p) => p.type === filter);

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-300">
      <HexagonBackground />
      <Header />

      {/* Hero */}
      <section className="relative container mx-auto px-4 py-16 md:py-24 z-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            {pt.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {pt.subtitle}
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { key: 'all' as const, label: pt.filterAll, icon: null },
            { key: 'web' as const, label: pt.filterWeb, icon: Globe },
            { key: 'mobile' as const, label: pt.filterMobile, icon: Smartphone },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                filter === key
                  ? 'bg-trustworthy-blue text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {label}
            </button>
          ))}
        </div>

        {/* Projects grid – web: landscape, mobile: portrait */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} viewLabel={pt.viewProject} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-500 py-12">
            Bu kategoride proje bulunmuyor.
          </p>
        )}
      </section>

      <Footer />
    </main>
  );
}

function ProjectCard({ project, viewLabel }: { project: Project; viewLabel: string }) {
  const isWeb = project.type === 'web';
  const orientation = isWeb ? 'landscape' : 'portrait';
  const firstImage = project.images[0] ?? '';

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-trustworthy-blue/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
    >
      <div className={`relative overflow-hidden ${isWeb ? 'aspect-video' : 'aspect-[9/16] max-h-[420px] mx-auto'}`}>
        <ProjectImage
          src={firstImage}
          alt={project.title}
          orientation={orientation}
          className="w-full transition-transform duration-500 group-hover:scale-105"
          sizes={isWeb ? '(max-width: 768px) 100vw, 50vw, 33vw' : '(max-width: 768px) 100vw, 50vw, 25vw'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg font-semibold text-sm">
            {viewLabel}
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <span className="text-xs font-medium text-trustworthy-blue dark:text-blue-300 uppercase tracking-wider">
          {isWeb ? 'Web' : 'Mobil'}
        </span>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-1 line-clamp-2">
          {project.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
          {project.shortDescription}
        </p>
      </div>
    </Link>
  );
}
