import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/api";
import LocaleContext from "../contexts/LocaleContext";

function RegisterPage() {
    const { locale } = useContext(LocaleContext);
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
                <h2>{locale === "id" ? "Daftar" : "Register"}</h2>
                <RegisterInput register={onRegisterHandler} />
                <p>{locale === "id" ? "Sudah memiliki akun?" : "Already have an account?"}
                    <Link to="/">
                        {locale === "id" ? "Masuk disini" : "Login here"}
                    </Link>
                </p>
            </div>

        </section>
    );
}

export default RegisterPage;
