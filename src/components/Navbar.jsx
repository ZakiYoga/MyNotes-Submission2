import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import { MdOutlineLanguage, MdOutlineMailOutline, MdStickyNote2, MdLogout } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";

import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";
import { getAccessToken } from "../utils/api";
function Navbar({ logout, name, email }) {
    const { locale, toggleLocale } = useContext(LocaleContext);
    const [open, setOpen] = useState(false);

    const accessToken = getAccessToken();

    const handleToggleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleLogout = () => {
        setOpen(false);
        logout();
    };

    return (
        <div className="navbar">
            <Link to="/">
                <h1 className="logo-text">
                    <MdStickyNote2 className="logo-icon" />
                    MyMo
                </h1>
            </Link>

            <div className="navbar-menu">
                {accessToken ? (
                    <div className="toggle-profile">
                        <button onClick={handleToggleClick}>
                            {locale === "id" ? "Hallo, " : "Hello,"} {name}
                            <FaAngleDown className="icon-dropdown" />
                        </button>
                        {
                            open && (
                                <ul className="toggle-profile__drop-down">
                                    <li>
                                        <MdOutlineMailOutline className="email" />
                                        {email}
                                    </li>
                                    <li>
                                        <MdLogout className="logout" />
                                        <button onClick={handleLogout}>
                                            {locale === "id" ? "Keluar" : "Logout"}
                                        </button>
                                    </li>
                                </ul>
                            )
                        }

                    </div>
                ) : <></>}
                <div className="toggle-language">
                    <button onClick={toggleLocale}><MdOutlineLanguage className="toggle-language__icon" /> {locale === "id" ? "En" : "Id"}</button>
                </div>
                <ToggleTheme />
            </div>

        </div>
    );
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
};

export default Navbar;
