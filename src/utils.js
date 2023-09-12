import React from "react";
import Cookie from "js-cookie";
import {COLOR_THEME_COOKIE_NAME, DARK_TOKENS, LIGHT_TOKENS} from "@/constants";

export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export function useToggleTheme(initialTheme) {
  const [theme, setTheme] = React.useState(initialTheme);

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    Cookie.set(COLOR_THEME_COOKIE_NAME, newTheme, {
      expires: 365,
    });

    const newTokens = newTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;

    root.setAttribute('data-color-theme', newTheme);

    Object.entries(newTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return [theme, toggleTheme];
}
