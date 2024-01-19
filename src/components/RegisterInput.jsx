import React, { useContext } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import { MdOutlineEmail, MdOutlineLock, MdOutlinePerson } from "react-icons/md";
import LocaleContext from "../contexts/LocaleContext";

function RegisterInput({ register }) {
    const { value: name, onChange: onNameChange } = useInput("");
    const { value: email, onChange: onEmailChange } = useInput("");
    const { value: password, onChange: onPasswordChange } = useInput("");
    const { value: confirmPassword, onChange: onConfirmPasswordChange } = useInput("");
    const { locale } = useContext(LocaleContext);

    function onSubmitHandler(event) {
        event.preventDefault();

        if (password === confirmPassword) {
            register({
                name: name,
                email: email,
                password: password,
            });
        } else {
            const message = locale === "id" ? "Kata sandi dan konfirmasi kata sandi harus sama" : "Password and password confirm must be same";
            alert(message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className="form-input">
            <div className="form-input__user">
                <MdOutlinePerson className="icon-user" />
                <input type="text" placeholder={locale === "id" ? "Nama" : "Name"} value={name} onChange={onNameChange} />
            </div>
            <div className="form-input__email">
                <MdOutlineEmail className="icon-email" />
                <input type="email" placeholder="Email" value={email} onChange={onEmailChange} />
            </div>
            <div className="form-input__password">
                <MdOutlineLock className="icon-password" />
                <input type="password" placeholder={locale === "id" ? "Kata Sandi" : "Password"} autoComplete='current-password' value={password} onChange={onPasswordChange} />
            </div>
            <div className="form-input__confirm-password">
                <MdOutlineLock className="icon-password" />
                <input type="password" placeholder={locale === "id" ? "Konfirmasi kata sandi" : "Confirm Password"} autoComplete='current-password' value={confirmPassword} onChange={onConfirmPasswordChange} />
            </div>
            <button>{locale === "id" ? "Daftar" : "Signup"}</button>
        </form>
    );
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired,
};

export default RegisterInput;