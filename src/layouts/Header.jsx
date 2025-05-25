import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useAuth } from "../supabase/custom-hooks/useAuth.tsx";
import { loginSchema } from "@/lib/validation";
import ProtectedComponent from "@/components/auth/ProtectedComponent"
import { showNotification } from "@utils";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    name: "Scores",
    path: "/admin/scores",
    activePaths: ["/admin/scores", "/admin/quiz-scores/", "/admin/student-breakdown/"],
  },
  {
    name: "Quizzes",
    path: "/admin/quiz-system",
    activePaths: ["/admin/quiz-system", "/admin/quiz-detail/"],
  },
];


const Header = () => {
  const [open, setOpen] = useState(false);
  const [userState, setUserState] = useState(null)

  const location = useLocation();

  const { user } = useAuth()

  useEffect(() => {
    setUserState(user)
  }, [user])

  return (
    <header className="bg-white shadow-sm w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0">
            <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Ki<span className="text-pink-600">Net</span>Ic
            </span>
          </NavLink>
          
          {/* Navigation for larger screens */}
          <ProtectedComponent>        
            <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const isActive = item.activePaths.some((p) =>
                location.pathname.startsWith(p)
              );
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={`relative pb-2 hover:text-purple-600 hover:font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-purple-600 font-medium after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-purple-600 after:transition-all after:duration-300'
                          : 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-purple-600 after:hover:w-full after:transition-all after:duration-300'
                      }`}
                    >
                      {item.name}
                    </NavLink>
                  );
                })}
            </nav>                
          </ProtectedComponent>

          {/* Login Button for Larger Screens */}
          <div className="hidden md:block">
            <LoginLogoutDialog variant={userState ? "logout" : "login"}/>
          </div>

          {/* Mobile menu button */}
          <ProtectedComponent>
            <div className="md:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <X className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Menu className="h-6 w-6" aria-hidden="true" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col h-full">
                    <div className="px-4 pt-5 pb-4 sm:px-6">
                      <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                        Ki<span className="text-pink-600">Net</span>Ic
                      </span>
                    </div>
                    <div className="flex-grow px-4 pt-2 pb-3 space-y-1">
                    {navItems.map((item) => {
                      const isActive = item.activePaths.some((p) =>
                        location.pathname.startsWith(p)
                      );

                      return (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={`relative pb-2 hover:text-purple-600 hover:font-medium transition-all duration-300 ${
                            isActive
                              ? 'text-purple-600 font-medium after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-purple-600 after:transition-all after:duration-300'
                              : 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-purple-600 after:hover:w-full after:transition-all after:duration-300'
                          }`}
                        >
                          {item.name}
                        </NavLink>
                      );
                    })}
                    </div>
                    <div className="px-4 py-4 border-t border-gray-200">
                      <LoginLogoutDialog variant={userState ? "logout" : "login"}/>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </ProtectedComponent>
        </div>
      </div>
    </header>
  );
};

const LoginLogoutDialog = ({ variant }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }      
    })
  }

  const { signIn, signOut } = useAuth()

  const handleSubmit = async() => { 
    const validationResult = loginSchema.safeParse(user);

    if (validationResult.success) {
      const result = await signIn(user.email, user.password);

      if (!result.error) {
        console.log('Signed in successfully!');
        showNotification('success', 'Signed in successfully!');
      } else {
        showNotification('error', 'Error signing in!');
      }      
    } else {
      const formattedErrors = validationResult.error.errors
      .map(err => `• ${err.message}`) // Add bullet points
      .join('\n'); // Join with line breaks for readability
  
      showNotification('error', formattedErrors);
    }
  }
  const handleLogout = () => {
    signOut()
    showNotification('success', 'Signed out successfully!');
  }

  return (
    <>
      {
        variant === "login" ? (
          <Dialog>      
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" name="email" placeholder="Enter Email" onChange={handleChange} />
                </div>
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input type="password" id="password" name="password" placeholder="Enter Password" onChange={handleChange} />
                </div>
              </div>

              <DialogFooter>            
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                  Login
                </Button>                   
              </DialogFooter>
            </DialogContent>                               
          </Dialog>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Logout</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will log out your currently logged in account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      }
    </>
    
  )  
};

export default Header;
