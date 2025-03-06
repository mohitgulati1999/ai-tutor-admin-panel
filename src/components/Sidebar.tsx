
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Menu, 
  X, 
  Home,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  const navItems = [
    { 
      path: '/', 
      name: 'Dashboard', 
      icon: <Home className="h-5 w-5" /> 
    },
    { 
      path: '/courses', 
      name: 'Courses', 
      icon: <BookOpen className="h-5 w-5" /> 
    },
    { 
      path: '/assessments', 
      name: 'Assessments', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      path: '/candidates', 
      name: 'Candidates', 
      icon: <Users className="h-5 w-5" /> 
    },
  ];

  return (
    <>
      <div 
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 flex flex-col glass-morphism transition-all duration-300",
          expanded ? "w-64" : "w-20"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4">
          <div className={cn("flex items-center", expanded ? "justify-between w-full" : "justify-center")}>
            {expanded && (
              <h1 className="text-xl font-bold text-gradient">AI Trainer</h1>
            )}
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 rounded-lg hover:bg-secondary/80 transition-colors"
            >
              {expanded ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto scrollbar-none">
          <ul className="space-y-2 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center p-3 rounded-lg transition-all duration-200 group",
                    location.pathname === item.path 
                      ? "bg-primary/20 text-primary-foreground" 
                      : "hover:bg-secondary/80"
                  )}
                >
                  <div className="flex items-center justify-center">
                    {item.icon}
                  </div>
                  
                  {expanded && (
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  )}
                  
                  {!expanded && (
                    <span className="fixed left-20 ml-6 p-2 rounded-md bg-secondary text-sm font-medium opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4">
          <div className={cn(
            "flex items-center p-3 rounded-lg bg-secondary/60 transition-all duration-200",
            expanded ? "justify-between" : "justify-center"
          )}>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium">A</span>
              </div>
              {expanded && (
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Admin</span>
                  <span className="text-xs text-muted-foreground">admin@company.com</span>
                </div>
              )}
            </div>
            {expanded && (
              <ChevronRight size={16} />
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile overlay */}
      {expanded && (
        <div 
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setExpanded(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
