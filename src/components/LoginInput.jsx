import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import useInput from "../hooks/useInput";
import LocaleContext from "../contexts/LocaleContext";

function LoginInput({ login }) {
    const { value: email, onChange: onEmailChangeHandler } = useInput("");
    const { value: password, onChange: onPasswordChangeHandler } = useInput("");
    const { locale } = useContext(LocaleContext);

    const onSubmitHandler = (event) => {
        event.preventDefault();

        login({
            email,
            password,
        });
    };

    return (
        <form onSubmit={onSubmitHandler} className="form-input">
            <div className="form-input__email">
                <MdOutlineEmail className="icon-email" />
                <input type="email" placeholder="Email" value={email} onChange={onEmailChangeHandler} />
            </div>
            <div className="form-input__password">
                <MdOutlineLock className="icon-password" />
                <input type="password" placeholder={locale === "id" ? "Kata Sandi" : "Password"} value={password} onChange={onPasswordChangeHandler} />
            </div>
            <button>{locale === "id" ? "Masuk" : "Login"}</button>
        </form>
    );
}

LoginInput.propTypes = {
    login: PropTypes.func.isRequired,
};

export default LoginInput;