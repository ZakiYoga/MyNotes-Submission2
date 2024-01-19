import React, { useContext } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import { MdOutlineEmail, MdOutlineLock, MdOutlinePerson } from "react-icons/md";
import LocaleContext from "../contexts/LocaleContext";

// class RegisterInput extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             name: "",
//             email: "",
//             password: "",
//         };

//         this.onNameChange = this.onNameChange.bind(this);
//         this.onEmailChange = this.onEmailChange.bind(this);
//         this.onPasswordChange = this.onPasswordChange.bind(this);
//         this.onSubmitHandler = this.onSubmitHandler.bind(this);
//     }

//     onNameChange(event) {
//         this.setState(() => {
//             return {
//                 name: event.target.value,
//             };
//         });
//     }

//     onEmailChange(event) {
//         this.setState(() => {
//             return {
//                 email: event.target.value,
//             };
//         });
//     }

//     onPasswordChange(event) {
//         this.setState(() => {
//             return {
//                 password: event.target.value,
//             };
//         });
//     }

//     onSubmitHandler(event) {
//         event.preventDefault();

//         this.props.register({
//             name: this.state.name,
//             email: this.state.email,
//             password: this.state.password,
//         });
//     }


//     render() {
//         return (
//             <form onSubmit={this.onSubmitHandler} className="form-input">
//                 <div className="form-input__user">
//                     <MdOutlinePerson className="icon-user" />
//                     <input type="text" placeholder="Nama" value={this.state.name} onChange={this.onNameChange} />
//                 </div>
//                 <div className="form-input__email">
//                     <MdOutlineEmail className="icon-email" />
//                     <input type="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
//                 </div>
//                 <div className="form-input__password">
//                     <MdOutlineLock className="icon-password" />
//                     <input type="password" placeholder="Password" autoComplete='current-password' value={this.state.password} onChange={this.onPasswordChange} />
//                 </div>
//                 <div className="form-input__confirm-password">
//                     <MdOutlineLock className="icon-password" />
//                     <input type="password" placeholder="Password" autoComplete='current-password' value={this.state.password} onChange={this.onPasswordChange} />
//                 </div>
//                 <button>Register</button>
//             </form>
//         );
//     }
// }

// RegisterInput.propTypes = {
//     register: PropTypes.func.isRequired,
// };

// export default RegisterInput;

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
            alert("Password and password confirm must be same");
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
                <input type="email" placeholder="Email" onChange={onEmailChange} />
            </div>
            <div className="form-input__password">
                <MdOutlineLock className="icon-password" />
                <input type="password" placeholder={locale === "id" ? "Kata Sandi" : "Password"} autoComplete='current-password' value={password} onChange={onPasswordChange} />
            </div>
            <div className="form-input__confirm-password">
                <MdOutlineLock className="icon-password" />
                <input type="password" placeholder={locale === "id" ? "Konfirmasi kata sandi" : "Confirm Password"} autoComplete='current-password' value={confirmPassword} onChange={onConfirmPasswordChange} />
            </div>
            <button>Register</button>
        </form>
    );
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired,
};

export default RegisterInput;