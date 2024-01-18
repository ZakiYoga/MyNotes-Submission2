import React from "react";
import PropTypes from "prop-types";
import { MdOutlineEmail, MdOutlineLock, MdOutlinePerson } from "react-icons/md";

class RegisterInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
        };

        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onNameChange(event) {
        this.setState(() => {
            return {
                name: event.target.value,
            };
        });
    }

    onEmailChange(event) {
        this.setState(() => {
            return {
                email: event.target.value,
            };
        });
    }

    onPasswordChange(event) {
        this.setState(() => {
            return {
                password: event.target.value,
            };
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.props.register({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        });
    }


    render() {
        return (
            <form onSubmit={this.onSubmitHandler} className="form-input">
                <div className="form-input__user">
                    <MdOutlinePerson className="icon-user" />
                    <input type="text" placeholder="Nama" value={this.state.name} onChange={this.onNameChange} />
                </div>
                <div className="form-input__email">
                    <MdOutlineEmail className="icon-email" />
                    <input type="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
                </div>
                <div className="form-input__password">
                    <MdOutlineLock className="icon-password" />
                    <input type="password" placeholder="Password" autoComplete='current-password' value={this.state.password} onChange={this.onPasswordChange} />
                </div>
                <button>Register</button>
            </form>
        );
    }
}

RegisterInput.propTypes = {
    register: PropTypes.func.isRequired,
};

export default RegisterInput;
