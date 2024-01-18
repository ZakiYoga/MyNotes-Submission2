import React from "react";
import { LuSearchX } from "react-icons/lu";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <>
            <div className="container_PageNotFound">
                <p className="PageNotFound__head">Ooooops! Page not found!</p>
                <h1 className="PageNotFound__404">4<LuSearchX className="notfound-icon" />4</h1>
                <p className="PageNotFound__content">You may have mistype the URL.
                    <br />Or the page has been removed.</p>
                <Link to="/" className="PageNotFound__back-btn">Return to Homepage</Link>

            </div>
        </>
    );
};

export default PageNotFound;         