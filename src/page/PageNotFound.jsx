import React, { useContext } from "react";
import { LuSearchX } from "react-icons/lu";
import { Link } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";

function PageNotFound() {
    const { locale } = useContext(LocaleContext);
    return (
        <>
            <div className="container_PageNotFound">
                <p className="PageNotFound__head">Ooooops! {locale === "id" ? "Halaman tidak ditemukan" : "Page not found!"}</p>
                <h1 className="PageNotFound__404">4<LuSearchX className="notfound-icon" />4</h1>
                <p className="PageNotFound__content">{locale === "id" ? "Anda mungkin salah mengetik URL" : "You may have mistype the URL."}
                    <br />{locale === "id" ? "atau halaman telah dihapus" : "Or the page has been removed."}</p>
                <Link to="/" className="PageNotFound__back-btn">{locale === "id" ? "Kembali ke Halaman utama" : "Return to Homepage"}</Link>

            </div>
        </>
    );
}

export default PageNotFound;         