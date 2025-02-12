import React from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white shadow-md w-full">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-blue-500">Ki</span>
          <span className="text-green-500">Net</span>
          <span className="text-purple-500">Ic</span>
        </h1>
        <Button>Login</Button>
      </div>
    </header>
  );
};

export default Header;
