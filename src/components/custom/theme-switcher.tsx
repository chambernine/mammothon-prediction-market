"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Utility for conditional class merging

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-1 rounded-full border border-gray-600 h-7">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("system")}
        className={cn(
          "rounded-full p-1",
          theme === "system" && "bg-gray-700 text-white"
        )}
      >
        <Monitor className="h-2 w-2" />
        <span className="sr-only">System theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        className={cn(
          "rounded-full p-1",
          theme === "light" && "bg-gray-700 text-white"
        )}
      >
        <Sun className="h-2 w-2" />
        <span className="sr-only">Light theme</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        className={cn(
          "rounded-full p-1",
          theme === "dark" && "bg-gray-700 text-white"
        )}
      >
        <Moon className="h-2 w-2" />
        <span className="sr-only">Dark theme</span>
      </Button>
    </div>
  );
}
