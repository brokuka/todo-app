import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

const useThemeSwitch = () => {
  const themeStorage = window.localStorage.getItem("theme") as Theme;
  const [theme, setTheme] = useState(themeStorage);
  const htmlElement = document.documentElement;
  const themeDarkMatch = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const onWindowMatch = () => {
    if (themeStorage === "dark" || (!themeStorage && themeDarkMatch)) {
      htmlElement.classList.add("dark");
    } else htmlElement.classList.remove("dark");
  };
  onWindowMatch();

  useEffect(() => {
    switch (theme) {
      case "dark":
        htmlElement.classList.add("dark");
        localStorage.setItem("theme", theme);
        break;
      case "light":
        htmlElement.removeAttribute("class");
        localStorage.setItem("theme", theme);
        break;
      default:
        if (!themeDarkMatch && themeStorage) return;
        localStorage.removeItem("theme");
        break;
    }
  }, [theme]);

  return [theme, setTheme] as const;
};

export default useThemeSwitch;
