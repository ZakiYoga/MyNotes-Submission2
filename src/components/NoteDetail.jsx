import React from "react";
import PropTypes from "prop-types";
import NoteItemButton from "./NoteItemButton";
import { showFormattedDate } from "../utils";

function NotesDetail({ id, title, createdAt, body, archived, onDelete, onArchive, onUnarchive }) {
    return (
        <div className="note-item__detail">
            <h2 className="note-item__title">{title}</h2>
            <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
            <p className="note-item__description">{body}</p>
            <div className="note-item__button">
                <NoteItemButton id={id} onDelete={onDelete} archived={archived} onArchive={onArchive} onUnarchive={onUnarchive} />
            </div>
        </div>
    );
}

NotesDetail.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    archived: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onArchive: PropTypes.func,
    onUnarchive: PropTypes.func,
};

export default NotesDetail;
