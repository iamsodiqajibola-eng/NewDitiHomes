import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

type ThemeToggleProps = {
  className?: string;
};

function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-(--dh-border) bg-(--dh-surface) text-(--dh-gold) transition duration-200 hover:border-(--dh-gold) hover:bg-(--dh-surface-hover) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--dh-gold) ${className}`}
    >
      {isDark ? <FiSun size={19} /> : <FiMoon size={19} />}
    </button>
  );
}

export default ThemeToggle;
