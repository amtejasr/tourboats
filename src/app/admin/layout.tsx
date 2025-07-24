import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
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
