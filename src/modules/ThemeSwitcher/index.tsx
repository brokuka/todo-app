import Scale from "../../components/Scale";
import IconButton from "../../components/IconButton";
import useThemeSwitch from "../../hooks/useThemeSwitch";

const ThemeSwitcher: React.FC = (): JSX.Element => {
  const [theme, setTheme] = useThemeSwitch();

  return (
    <div className="relative h-10">
      <Scale
        className="absolute top-0 left-0"
        show={theme === "dark"}
        duration={300}
      >
        <IconButton
          onClick={() => setTheme("light")}
          icon={"lightmode"}
          className="dark:text-yellow-400"
          width={24}
          height={24}
        />
      </Scale>

      <Scale
        className="absolute top-0 left-0"
        show={theme === "light"}
        duration={300}
      >
        <IconButton
          onClick={() => setTheme("dark")}
          icon={"darkmode"}
          className="dark:text-yellow-400"
          width={24}
          height={24}
        />
      </Scale>
    </div>
  );
};

export default ThemeSwitcher;
