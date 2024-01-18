import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/api";

function LoginPage({ loginSuccess }) {
    async function onLogin({ email, password }) {
        const { error, data } = await login({ email, password });

        if (!error) {
            loginSuccess(data);
        }
    }

    return (
        <section className="form">
            <div className="box-form">
                <h2>Sign In</h2>
                <LoginInput login={onLogin} />
                <p>Don`t have an account?
                    <Link to="/register">
                        Sign up here
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