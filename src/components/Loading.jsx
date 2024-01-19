import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { LocaleConsumer } from "../contexts/LocaleContext";

function Loading() {
    return (
        <LocaleConsumer>
            {
                ({ locale }) => {
                    return (
                        <div className="loading">
                            <ThreeDots
                                visible={true}
                                width="80"
                                color="#F5841A"
                                ariaLabel={locale === "id" ? "Memuat..." : "Loading..."}
                            />
                            <p>{locale === "id" ? "Memuat..." : "Loading..."}</p>
                        </div>
                    );
                }
            }
        </LocaleConsumer>
    );
}

export default Loading;
