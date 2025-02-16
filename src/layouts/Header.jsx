import { useState } from "react";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Scores", path: "/admin/scores" },
  { name: "Quizzes", path: "/admin/quiz-system" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

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
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `relative pb-2 hover:text-purple-600 hover:font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-purple-600 after:content-[""] font-medium after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:bg-purple-600 after:transition-all after:duration-300'
                      : 'after:content-[""] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-0 after:bg-purple-600 after:hover:w-full after:transition-all after:duration-300'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Login Button for Larger Screens */}
          <div className="hidden md:block">
            <LoginDialog />
          </div>

          {/* Mobile menu button */}
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
                    {navItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-base font-medium ${
                            isActive
                              ? "text-purple-600 bg-purple-50"
                              : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
                          }`
                        }
                        onClick={() => setOpen(false)}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                  <div className="px-4 py-4 border-t border-gray-200">
                    <LoginDialog />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

const LoginDialog = () => (
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
          <Input type="email" id="email" placeholder="Enter Email" />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Enter Password" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default Header;
