import React from "react";
import PropTypes from "prop-types";

function EmptyNote({ icon, title }) {
    return (
        <div className="empty-note">
            <div className="empty-note__icon">
                {icon}
            </div>
            <p className="empty-note__title">
                {title}
            </p>
        </div>
    );
}

EmptyNote.propTypes = {
    icon: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

export default EmptyNote;
