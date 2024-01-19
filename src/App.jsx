import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./page/HomePage";
import DetailPage from "./page/DetailPage";
import PageNotFound from "./page/PageNotFound";
import AddNotePage from "./page/AddNotePage";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LocaleProvider } from "./contexts/LocaleContext";

import { getUserLogged, putAccessToken } from "./utils/api";
import ArchivesPage from "./page/ArchivesPage";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            authedUser: null,
            initializing: true,
            localeContext: {
                locale: localStorage.getItem("locale") || "id",
                toggleLocale: () => {
                    this.setState((prevState) => {
                        const newLocale = prevState.localeContext.locale === "id" ? "en" : "id";
                        localStorage.setItem("locale", newLocale);
                        return {
                            localeContext: {
                                ...prevState.localeContext,
                                locale: prevState.localeContext.locale === "id" ? "en" : "id"
                            }
                        };
                    });
                }
            },
            theme: localStorage.getItem("theme") || "light",
            toggleTheme: () => {
                this.setState((prevState) => {
                    const newTheme = prevState.theme === "light" ? "dark" : "light";
                    localStorage.setItem("theme", newTheme);

                    return {
                        theme: newTheme
                    };
                });
            }
        };

        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.theme !== this.state.theme) {
            document.documentElement.setAttribute("data-theme", this.state.theme);
        }
    }


    async componentDidMount() {
        const { data } = await getUserLogged();
        document.documentElement.setAttribute("data-theme", this.state.theme);
        this.setState(() => {
            return {
                authedUser: data,
                initializing: false
            };
        });
    }

    async onLoginSuccess({ accessToken }) {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();

        this.setState(() => {
            return {
                authedUser: data,
            };
        });
    }

    onLogout() {
        this.setState(() => {
            return {
                authedUser: null
            };
        });
        putAccessToken("");
    }

    render() {
        if (this.state.initializing) {
            return null;
        }

        if (this.state.authedUser === null) {
            return (
                <LocaleProvider value={this.state.localeContext}>
                    <header>
                        {/* <Navbar /> */}
                    </header>
                    <main>
                        <Routes>
                            <Route path="/*" element={<LoginPage loginSuccess={this.onLoginSuccess} />} />
                            <Route path="/register" element={<RegisterPage />} />
                        </Routes>
                    </main>
                </LocaleProvider>
            );
        }

        return (
            <ThemeProvider value={this.state}>
                <LocaleProvider value={this.state.localeContext}>
                    <header>
                        <Navbar logout={this.onLogout} name={this.state.authedUser.name} email={this.state.authedUser.email} />
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

}

export default App;
