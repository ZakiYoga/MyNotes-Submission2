import React, { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Loading from "./components/Loading";
import HomePage from "./page/HomePage";
import DetailPage from "./page/DetailPage";
import PageNotFound from "./page/PageNotFound";
import AddNotePage from "./page/AddNotePage";
import ArchivesPage from "./page/ArchivesPage";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import { Routes, Route } from "react-router-dom";

import { LocaleProvider } from "./contexts/LocaleContext";
import { ThemeProvider } from "./contexts/ThemeContext";

import { getUserLogged, putAccessToken } from "./utils/api";

function App() {
    const [authedUser, setAuthedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [locale, setLocale] = useState(localStorage.getItem("locale") || "id");
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    const toggleLocale = () => {
        setLocale((prevLocale) => {
            const newLocale = prevLocale === "id" ? "en" : "id";
            localStorage.setItem("locale", newLocale);
            return newLocale;
        });
    };

    const toggleTheme = () => {
        setTheme((prevState) => {
            const newTheme = prevState === "dark" ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            return newTheme;
        });
    };

    const localeContextValue = useMemo(() => {
        return {
            locale,
            toggleLocale,
        };
    }, [locale]);

    const themeContextValue = useMemo(() => {
        return {
            theme,
            toggleTheme,
        };
    }, [theme]);

    useEffect(() => {
        async function getData() {
            return await getUserLogged().then(({ data }) => {
                setAuthedUser(data);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
        }

        getData();
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    async function onLoginSuccess({ accessToken }) {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();
        setAuthedUser(data);
    }

    function onLogout() {
        putAccessToken("");
        setAuthedUser(null);
    }

    if (loading) {
        return (
            <ThemeProvider value={themeContextValue}>
                <LocaleProvider value={localeContextValue}>
                    <Loading />
                </LocaleProvider>
            </ThemeProvider>
        );
    }

    if (authedUser === null) {
        return (
            <ThemeProvider value={themeContextValue}>
                <LocaleProvider value={localeContextValue}>
                    <header>
                        <Navbar logout={onLogout} />
                    </header>
                    <main>
                        <Routes>
                            <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Routes>
                    </main>
                </LocaleProvider>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider value={themeContextValue}>
            <LocaleProvider value={localeContextValue}>
                <header>
                    <Navbar logout={onLogout} name={authedUser.name} email={authedUser.email} />
                </header>
                <main className="container">
                    <div className="main-container">
                        <Sidebar />
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/archives" element={<ArchivesPage />} />
                            <Route path="/notes/:id" element={<DetailPage />} />
                            <Route path="/notes/new" element={<AddNotePage />} />
                            <Route path="*" element={<PageNotFound />} />
                        </Routes>
                    </div>
                </main>
            </LocaleProvider>
        </ThemeProvider>
    );
}

export default App;