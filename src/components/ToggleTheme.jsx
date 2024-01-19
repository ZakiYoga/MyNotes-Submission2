import React, { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { PiMoonStarsFill, PiSunLight } from "react-icons/pi";

function ToggleTheme() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className="toggle-theme">
            <button onClick={toggleTheme} >
                {theme === "light" ? <PiMoonStarsFill className="toggle-theme__moon" /> : <PiSunLight className="toggle-theme__sun" />}
            </button >
        </div>
    );


}

export default ToggleTheme;