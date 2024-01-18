import React from "react";
import NoteItemBody from "./NoteItemBody";
import NoteItemButton from "./NoteItemButton";
import PropTypes from "prop-types";

function NoteItem({
  id,
  title,
  body,
  createdAt,
  onDelete,
  archived,
  onArchive,
  onUnarchive,
}) {
  return (
    <div className="note-item">
      <NoteItemBody id={id} title={title} body={body} date={createdAt} />
      <NoteItemButton
        id={id}
        onDelete={onDelete}
        archived={archived}
        onArchive={onArchive}
        onUnarchive={onUnarchive}
      />
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  archived: PropTypes.bool.isRequired,
  onArchive: PropTypes.func,
  onUnarchive: PropTypes.func,
};

export default NoteItem;
