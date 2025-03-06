
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';

type LayoutProps = {
  children: ReactNode;
  className?: string;
};

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      <Sidebar />
      <main className={cn("flex-1 p-6 md:p-8 transition-all duration-300 ease-in-out animate-fade-in", className)}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
