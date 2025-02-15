import React, { useState } from "react";
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
import { Menu } from "lucide-react";

const navItems = [
  { name: "Scores", path: "/admin/scores" },
  { name: "Quizzes", path: "/admin/quiz-system" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/">
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Ki<span className="text-pink-600">Net</span>Ic
          </span>
        </NavLink>

        {/* Navigation for larger screens */}
        <nav className="hidden md:flex gap-6">
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

        {/* Mobile Navigation - Sheet */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="md:hidden" variant="ghost">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-6">
            {/* Logo in the Sheet */}
            <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
              Ki<span className="text-pink-600">Net</span>Ic
            </span>

            {/* Mobile Navigation */}
            <div className="flex flex-col gap-6 mt-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-lg font-medium ${
                      isActive ? "text-purple-600" : "text-gray-700"
                    } transition-all duration-300`
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Login Button inside Sheet */}
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-6 w-full">Login</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid w-full max-w-sm gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Enter Email" />
                  </div>
                  <div className="grid w-full max-w-sm gap-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      placeholder="Enter Password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Login</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SheetContent>
        </Sheet>

        {/* Login Dialog for Larger Screens */}
        <div className="hidden md:block">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="Enter Email" />
                </div>
                <div className="grid w-full max-w-sm gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Login</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default Header;
