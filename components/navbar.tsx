import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Github, Laptop, Moon, Pin, Sun, Twitter } from "lucide-react";

export default function Navbar() {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <Button variant="ghost">
          <Pin size={24} />
          <span className="ml-1 text-2xl">Pinner</span>
        </Button>

        <div className="space-x-1">
          <Button variant="ghost">
            <Github size={24} />
          </Button>
          <Button variant="ghost">
            <Twitter size={24} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Moon size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32 mr-4">
              <DropdownMenuItem>
                <Sun className="mr-2 h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Moon className="mr-2 h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Laptop className="mr-2 h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
