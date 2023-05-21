import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      iconButton
      color="neutral"
      onClick={() =>
        setTheme(theme === "light-theme" ? "dark-theme" : "light-theme")
      }
      variant="text"
    >
      <Icon
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        name="Sun"
      />
      <Icon
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        name="Moon"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
