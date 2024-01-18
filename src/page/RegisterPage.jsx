import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/api";

function RegisterPage() {
    const navigate = useNavigate();

    async function onRegisterHandler(user) {
        const { error } = await register(user);
        if (!error) {
            navigate("/");
        }
    }
    return (
        <section className="form">
            <div className="box-form">
                <h2>Register</h2>
                <RegisterInput register={onRegisterHandler} />
                <p>Already have an account?
                    <Link to="/">
                        Login here
                    </Link>
                </p>
            </div>

        </section>
    );
}

export default RegisterPage;
