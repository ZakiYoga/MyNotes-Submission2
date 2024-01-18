import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdArchive } from "react-icons/md";
import { MdUnarchive } from "react-icons/md";

import PropTypes from "prop-types";

function NoteItemButton({ id, onDelete, archived, onArchive, onUnarchive }) {
  return (
    <div className="note-item__button">
      <button className="note-item__trash" onClick={() => onDelete(id)}>
        <FaTrashAlt className="trashButton" />
      </button>
      {archived ?
        <button className="note-item__unarchive" onClick={() => onUnarchive(id)}>
          <MdUnarchive className="unarchiveButton" />
        </button>
        :
        <button className="note-item__archive" onClick={() => onArchive(id)}>
          <MdArchive className="archiveButton" />
        </button>
      }
    </div>
  );
}

NoteItemButton.propTypes = {
  id: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
};

export default NoteItemButton;
