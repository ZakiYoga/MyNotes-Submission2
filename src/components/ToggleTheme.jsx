import { ThemeConsumer } from "../contexts/ThemeContext";
import { PiMoonStarsFill, PiSunLight } from "react-icons/pi";

function ToggleTheme() {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => {
                return (
                    <div className="toggle-theme">
                        <button onClick={toggleTheme} >
                            {theme === "light" ? <PiMoonStarsFill className="toggle-theme__moon" /> : <PiSunLight className="toggle-theme__sun" />}
                        </button >
                    </div>
                );
            }}
        </ThemeConsumer >
    );
}

export default ToggleTheme;