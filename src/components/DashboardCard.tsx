
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: number;
  className?: string;
};

const DashboardCard = ({ title, value, icon, trend, className }: DashboardCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 flex flex-col space-y-4 transition-all duration-300 hover:translate-y-[-5px]",
      className
    )}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 rounded-full bg-primary/10">
          {icon}
        </div>
      </div>
      
      <div className="flex flex-col space-y-1">
        <span className="text-2xl font-bold">{value}</span>
        
        {trend !== undefined && (
          <div className="flex items-center text-xs">
            <span className={trend > 0 ? 'text-green-400' : 'text-red-400'}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
            <span className="ml-1 text-muted-foreground">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
