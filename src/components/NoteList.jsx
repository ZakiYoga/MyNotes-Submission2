import React from "react";
import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

function NoteList({ notes, onDelete, onArchive, onUnarchive }) {
  return (
    <div className="note-list">
      {notes.map((notes) => (
        <NoteItem
          key={notes.id}
          id={notes.id}
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
          {...notes}
        />
      ))}
    </div>
  );
}


NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
};

export default NoteList;