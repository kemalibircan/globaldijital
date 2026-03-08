'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { translations, Language } from '@/lib/translations';
import { contactInfo } from '@/lib/contactInfo';
import api from '@/lib/api';
import Cookies from 'js-cookie';

const HexagonBackground = dynamic(() => import('@/components/HexagonBackground'), {
  ssr: false,
});

export default function ContactPage() {
  const [lang, setLang] = useState<Language>('tr');
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLang = (Cookies.get('locale') || 'tr') as Language;
    setLang(savedLang);
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/contact', formData);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    } catch (error) {
      console.error('Failed to submit form:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  const t = translations[lang];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <HexagonBackground />
      <Header />

      <section className="relative container mx-auto px-4 py-20 z-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              İletişime Geçin
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              İşinizi dönüştürmeye hazır mısınız? Ücretsiz danışmanlık için bugün bize ulaşın.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-trustworthy-blue/10 dark:bg-trustworthy-blue/20 p-3 rounded-xl">
                  <Mail className="w-6 h-6 text-trustworthy-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                  <a href={`mailto:${contactInfo.email}`} className="text-gray-600 dark:text-gray-400 hover:text-trustworthy-blue transition-colors">{contactInfo.email}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-trustworthy-blue/10 dark:bg-trustworthy-blue/20 p-3 rounded-xl">
                  <Phone className="w-6 h-6 text-trustworthy-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Telefon</h3>
                  <a href={`tel:${contactInfo.phoneRaw}`} className="text-gray-600 dark:text-gray-400 hover:text-trustworthy-blue transition-colors">{contactInfo.phone}</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-trustworthy-blue/10 dark:bg-trustworthy-blue/20 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-trustworthy-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Konum</h3>
                  <p className="text-gray-600 dark:text-gray-400">{contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-gray-50 dark:bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-gray-200 dark:border-white/10">
            {submitted ? (
              <div className="text-center py-8">
                <div className="bg-green-500/20 border border-green-500 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg mb-4">
                  Teşekkür ederiz! En kısa sürede size dönüş yapacağız.
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-trustworthy-blue hover:underline font-medium"
                >
                  Başka mesaj gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-900 dark:text-white mb-2 font-medium">İsim</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-trustworthy-blue focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 dark:text-white mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-trustworthy-blue focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 dark:text-white mb-2 font-medium">Telefon</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-trustworthy-blue focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="+90 XXX XXX XX XX"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 dark:text-white mb-2 font-medium">Hizmet İlginiz</label>
                  <select
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-trustworthy-blue focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="">Bir hizmet seçin</option>
                    <option value="website">Web Sitesi</option>
                    <option value="mobile">Mobil Uygulama</option>
                    <option value="seo">SEO</option>
                    <option value="marketing">Dijital Pazarlama</option>
                    <option value="package">Tam Paket</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 dark:text-white mb-2 font-medium">Mesajınız</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-trustworthy-blue focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Projeniz hakkında bize bilgi verin..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-trustworthy-blue text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 font-semibold"
                >
                  <Send className="w-5 h-5" />
                  {loading ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
