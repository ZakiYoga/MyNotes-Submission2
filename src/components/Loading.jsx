import React, { useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import LocaleContext from "../contexts/LocaleContext";
import ThemeContext from "../contexts/ThemeContext";

function Loading() {
    const { locale } = useContext(LocaleContext);
    const { theme } = useContext(ThemeContext);
    return (

        <div className="loading">
            <ThreeDots
                visible={true}
                width="80"
                color={theme === "dark" ? "#2D6E7E" : "#F5841A"}
                ariaLabel={locale === "id" ? "Memuat..." : "Loading..."}
            />
            <p>{locale === "id" ? "Memuat..." : "Loading..."}</p>
        </div>

    );
}

export default Loading;
