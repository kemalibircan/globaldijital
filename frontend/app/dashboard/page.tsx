'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { Package, CreditCard, QrCode, LogOut, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HexagonBackground = dynamic(() => import('@/components/HexagonBackground'), {
  ssr: false,
});

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/');
      return;
    }

    fetchUserData();
    fetchOrders();
  }, [router]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black dark:bg-black light:bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-white dark:text-white light:text-gray-900">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
      <HexagonBackground />
      <Header
        rightContent={
          <div className="flex gap-4 items-center">
            <span className="text-gray-700 dark:text-white">
              Hoş geldiniz, <span className="font-semibold">{user?.name}</span>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-500/30 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Çıkış
            </button>
          </div>
        }
      />

      <div className="relative container mx-auto px-4 py-8 z-20">
        <h1 className="text-4xl font-bold text-white dark:text-white light:text-gray-900 mb-8">
          Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 dark:bg-white/5 light:bg-white backdrop-blur-xl p-6 rounded-2xl border border-white/10 dark:border-white/10 light:border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-trustworthy-blue/20 p-3 rounded-xl">
                <Package className="w-8 h-8 text-trustworthy-blue" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white dark:text-white light:text-gray-900">
                  {orders.length}
                </h3>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Toplam Sipariş</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 dark:bg-white/5 light:bg-white backdrop-blur-xl p-6 rounded-2xl border border-white/10 dark:border-white/10 light:border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-green-500/20 p-3 rounded-xl">
                <CreditCard className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white dark:text-white light:text-gray-900">
                  {orders.filter((o) => o.status === 'completed').length}
                </h3>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Tamamlanan</p>
              </div>
            </div>
          </div>

          <div className="bg-white/5 dark:bg-white/5 light:bg-white backdrop-blur-xl p-6 rounded-2xl border border-white/10 dark:border-white/10 light:border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-purple-500/20 p-3 rounded-xl">
                <TrendingUp className="w-8 h-8 text-purple-500" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white dark:text-white light:text-gray-900">
                  {orders.filter((o) => o.status === 'in_progress').length}
                </h3>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">Devam Eden</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white/5 dark:bg-white/5 light:bg-white backdrop-blur-xl rounded-2xl border border-white/10 dark:border-white/10 light:border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-white dark:text-white light:text-gray-900 mb-6">
            Son Siparişler
          </h2>
          
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <QrCode className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mb-4">
                Henüz siparişiniz yok.
              </p>
              <Link
                href="/services"
                className="inline-block px-6 py-3 bg-trustworthy-blue text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
              >
                Hizmetleri İncele
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 dark:border-white/10 light:border-gray-200">
                    <th className="text-left py-3 px-4 text-white dark:text-white light:text-gray-900 font-semibold">
                      Sipariş ID
                    </th>
                    <th className="text-left py-3 px-4 text-white dark:text-white light:text-gray-900 font-semibold">
                      Tutar
                    </th>
                    <th className="text-left py-3 px-4 text-white dark:text-white light:text-gray-900 font-semibold">
                      Durum
                    </th>
                    <th className="text-left py-3 px-4 text-white dark:text-white light:text-gray-900 font-semibold">
                      Tarih
                    </th>
                    <th className="text-left py-3 px-4 text-white dark:text-white light:text-gray-900 font-semibold">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr 
                      key={order.id} 
                      className="border-b border-white/10 dark:border-white/10 light:border-gray-200 hover:bg-white/5 dark:hover:bg-white/5 light:hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4 text-gray-300 dark:text-gray-300 light:text-gray-700">
                        {order.id.substring(0, 8)}...
                      </td>
                      <td className="py-3 px-4 text-gray-300 dark:text-gray-300 light:text-gray-700 font-semibold">
                        ${order.total_amount}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'completed'
                              ? 'bg-green-500/20 text-green-300 dark:text-green-300 light:text-green-700'
                              : order.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-300 dark:text-yellow-300 light:text-yellow-700'
                              : 'bg-blue-500/20 text-blue-300 dark:text-blue-300 light:text-blue-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-300 dark:text-gray-300 light:text-gray-700">
                        {new Date(order.created_at).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="py-3 px-4">
                        <Link
                          href={`/dashboard/orders/${order.id}`}
                          className="text-trustworthy-blue hover:underline font-semibold"
                        >
                          Detaylar
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
