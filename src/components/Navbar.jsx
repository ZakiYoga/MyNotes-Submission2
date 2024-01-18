import React from "react";
import { Link } from "react-router-dom";
import ToggleTheme from "./ToggleTheme";
import { MdOutlineLanguage, MdOutlineMailOutline, MdStickyNote2, MdLogout } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa6";

import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

function Navbar({ logout, name, email }) {
    return (
        <LocaleConsumer>
            {
                ({ locale, toggleLocale }) => {
                    return (
                        <div className="navbar">
                            <Link to="/">
                                <h1 className="logo-text">
                                    <MdStickyNote2 className="logo-icon" />
                                    MyMo
                                </h1>
                            </Link>

                            <div className="navbar-menu">
                                <div className="toggle-profile">
                                    <button>
                                        Welcome back, {name}
                                        <FaAngleDown className="icon-dropdown" />
                                    </button>
                                </div>
                                <ul className="toggle-profile__drop-down">
                                    <li>
                                        <MdOutlineMailOutline />
                                        {email}
                                    </li>
                                    <li>
                                        <button onClick={logout}>
                                            Logout <MdLogout />
                                        </button>
                                    </li>
                                </ul>
                                <div className="toggle-language">
                                    <button onClick={toggleLocale}><MdOutlineLanguage className="toggle-language__icon" /> {locale === "id" ? "En" : "Id"}</button>
                                </div>
                                <ToggleTheme />
                            </div>

                        </div>
                    );
                }
            }
        </LocaleConsumer >
    );
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

export default Navbar;
