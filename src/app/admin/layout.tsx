
'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Loading from '../loading';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'admin') {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'admin') {
    return <Loading />;
  }

  return (
    <div className="bg-secondary min-h-screen">
      <div className="container mx-auto px-4 py-8">
          <div className="bg-card p-6 rounded-lg shadow-md">
             {children}
          </div>
      </div>
    </div>
  );
}
