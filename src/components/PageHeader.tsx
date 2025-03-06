
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
};

const PageHeader = ({ title, subtitle, action, className }: PageHeaderProps) => {
  return (
    <div className={cn("mb-8 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0", className)}>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-muted-foreground">{subtitle}</p>
        )}
      </div>
      
      {action && (
        <div className="flex-shrink-0 animate-fade-in">{action}</div>
      )}
    </div>
  );
};

export default PageHeader;
