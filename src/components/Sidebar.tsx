
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Menu, 
  X, 
  Home,
  ChevronRight,
  UserCog,
  LogOut,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'admin' | 'student'>('admin');
  const [showProfileDialog, setShowProfileDialog] = useState(false);

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

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    // In a real app, you would clear auth state here
    navigate('/');
  };

  const handleUserTypeChange = (value: 'admin' | 'student') => {
    setUserType(value);
    toast({
      title: `User Type Changed`,
      description: `You are now viewing as ${value}`
    });
    
    // If switching to student dashboard, we could navigate to a different route
    if (value === 'student') {
      navigate('/');
    }
  };

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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={cn(
                "flex items-center p-3 rounded-lg bg-secondary/60 transition-all duration-200 cursor-pointer",
                expanded ? "justify-between" : "justify-center"
              )}>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-sm font-medium">A</span>
                  </div>
                  {expanded && (
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">Admin</span>
                      <span className="text-xs text-muted-foreground">{userType}</span>
                    </div>
                  )}
                </div>
                {expanded && (
                  <ChevronRight size={16} />
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>Account</span>
                  <span className="text-xs text-muted-foreground">admin@company.com</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowProfileDialog(true)}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserCog className="mr-2 h-4 w-4" />
                <span>Account settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>User Type</DropdownMenuLabel>
              <div className="px-2 py-1.5">
                <RadioGroup 
                  defaultValue={userType} 
                  onValueChange={(value) => handleUserTypeChange(value as 'admin' | 'student')}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Student</Label>
                  </div>
                </RadioGroup>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Mobile overlay */}
      {expanded && (
        <div 
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Profile Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              View and manage your profile information
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-4">
            <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <span className="text-3xl font-medium">A</span>
            </div>
            <h2 className="text-xl font-semibold">Admin User</h2>
            <p className="text-muted-foreground">admin@company.com</p>
            <div className="mt-4 bg-secondary/40 px-4 py-2 rounded-lg">
              <p>Current Role: <span className="font-medium capitalize">{userType}</span></p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Sidebar;
