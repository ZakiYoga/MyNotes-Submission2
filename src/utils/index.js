import React from "react";
import LocaleContext from "../contexts/LocaleContext";

function ShowFormattedDate(date) {
  const { locale } = React.useContext(LocaleContext);
  const formatDate = locale === "id" ? "id-ID" : "en-US";
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(formatDate, options);
}


export default ShowFormattedDate;