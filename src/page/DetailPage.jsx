import React from "react";
import NoteDetail from "../components/NoteDetail";
import EmptyNote from "../components/EmptyNote";
import { MdSearchOff } from "react-icons/md";
import PropTypes from "prop-types";
import { deleteNote, archiveNote, unarchiveNote, getNote } from "../utils/local-data";
import { useParams, useNavigate } from "react-router-dom";

function DetailNotePageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  return <DetailNotePage navigate={navigate} id={id} />;
}

class DetailNotePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: getNote(props.id),
    };

    this.onDeleteNotesHandler = this.onDeleteNotesHandler.bind(this);
    this.onArchiveNotesHandler = this.onArchiveNotesHandler.bind(this);
    this.onUnarchiveNotesHandler = this.onUnarchiveNotesHandler.bind(this);
  }

  onDeleteNotesHandler(id) {
    deleteNote(id);
    this.props.navigate("/");
  }

  onArchiveNotesHandler(id) {
    archiveNote(id);
    this.props.navigate("/");
  }

  onUnarchiveNotesHandler(id) {
    unarchiveNote(id);
    this.props.navigate("/archives");
  }

  render() {
    return (
      <>
        {this.state.notes == null ? (
          <EmptyNote icon={<MdSearchOff />} title="No results found for the searched note" />

        ) : (
          <div className="main">
            <NoteDetail
              onDelete={this.onDeleteNotesHandler}
              onArchive={this.onArchiveNotesHandler}
              onUnarchive={this.onUnarchiveNotesHandler}
              {...this.state.notes} />
          </div>
        )}
      </>
    );
  }
}

DetailNotePage.propTypes = {
  id: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default DetailNotePageWrapper;