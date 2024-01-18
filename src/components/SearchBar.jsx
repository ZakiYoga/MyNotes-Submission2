import React from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";
import { LocaleConsumer } from "../contexts/LocaleContext";

function SearchNote({ search, onSearchChange }) {
  return (
    <LocaleConsumer>
      {
        ({ locale }) => {
          return (
            <div className="search">
              <FiSearch className="search-icon" />
              <input
                type="search"
                id="search-note"
                name="search-note"
                className="search-input"
                placeholder={locale === "id" ? "Cari berdasarkan nama" : "Search by Title"}
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
              />
            </div>
          );
        }
      }

    </LocaleConsumer>
  );
}

SearchNote.propType = {
  search: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired
};

export default SearchNote;
