"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setTheme } from "@/store/slicers/themeReducer";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";

export const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    if (mounted) {
      document.body.className = theme;
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  if (!mounted) {
    return <button className="p-2 text-2xl cursor-pointer !bg-inherit" aria-hidden="true" />;
  }

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 text-2xl cursor-pointer !bg-inherit"
    >
      {theme === "light" ? <FaMoon className="text-black" /> : <IoSunnyOutline className="text-white" />}
    </button>
  );
};
