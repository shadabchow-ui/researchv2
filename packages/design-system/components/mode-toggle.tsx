"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { Button } from "../components/ui/button";

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button
      className="shrink-0 text-muted-foreground hover:text-foreground"
      onClick={toggle}
      size="icon"
      variant="ghost"
    >
      <SunIcon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
