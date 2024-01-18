import React from "react";
import PropTypes from "prop-types";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";

class LoginInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        };

        this.onEmailChangeHandler = this.onEmailChangeHandler.bind(this);
        this.onPasswordChangeHandler = this.onPasswordChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onEmailChangeHandler(event) {
        this.setState(() => {
            return {
                email: event.target.value
            };
        });
    }

    onPasswordChangeHandler(event) {
        this.setState(() => {
            return {
                password: event.target.value
            };
        });
    }

    onSubmitHandler(event) {
        event.preventDefault();

        this.props.login({
            email: this.state.email,
            password: this.state.password,
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler} className="form-input">
                <div className="form-input__email">
                    <MdOutlineEmail className="icon-email" />
                    <input type="email" placeholder="Email" value={this.state.email} onChange={this.onEmailChangeHandler} />
                </div>
                <div className="form-input__password">
                    <MdOutlineLock className="icon-password" />
                    <input type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChangeHandler} />
                </div>
                <button>Login</button>
            </form>
        );
    }
}

LoginInput.propTypes = {
    login: PropTypes.func.isRequired,
};

export default LoginInput;