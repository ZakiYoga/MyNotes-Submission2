import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";

function LoginPage({ loginSuccess }) {
    const { locale } = useContext(LocaleContext);

    async function onLogin({ email, password }) {
        const { error, data } = await login({ email, password });

        if (!error) {
            loginSuccess(data);
        }
    }

    return (
        <section className="form">
            <div className="box-form">
                <h2>{locale === "id" ? "Masuk" : "SignIn"}</h2>
                <LoginInput login={onLogin} />
                <p>{locale === "id" ? "Belum mempunyai akun?" : "Don`t have an account?"}
                    <Link to="/register">
                        {locale === "id" ? "Daftar" : "Signup"}
                    </Link>
                </p>
            </div>
        </section>
    );
}

LoginPage.propTypes = {
    loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;