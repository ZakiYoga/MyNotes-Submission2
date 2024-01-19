import React from "react";
import NoteDetail from "../components/NoteDetail";
import EmptyNote from "../components/EmptyNote";
import { MdOutlineSubtitlesOff } from "react-icons/md";
import PropTypes from "prop-types";
import Loading from "../components/Loading";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils/api";
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
      notes: null,
      initializing: true,
    };

    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchivedHandler = this.onArchivedHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getNote(this.props.id);
    this.setState(() => {
      return {
        notes: data,
        initializing: false,
      };
    });
  }

  async onDeleteHandler(id) {
    await deleteNote(id);
    this.props.navigate("/");
  }

  async onArchivedHandler(id) {
    this.state.notes.archived ? await unarchiveNote(id) : await archiveNote(id);
    this.props.navigate("/");
  }

  render() {
    if (this.state.initializing) {
      return (
        <section className="main">
          <Loading />
        </section>
      );
    }
    if (this.state.notes) {
      return (
        <section className="main">
          <NoteDetail
            id={this.props.id}
            onDelete={this.onDeleteHandler}
            archived={this.state.notes.archived}
            onArchive={this.onArchivedHandler}
            onUnarchive={this.onArchivedHandler}
            {...this.state.notes} />
        </section >
      );
    }
    return <EmptyNote icon={<MdOutlineSubtitlesOff />} title="Notes not found" />;
  }
}

DetailNotePage.propTypes = {
  id: PropTypes.string,
  navigate: PropTypes.func.isRequired,
};

export default DetailNotePageWrapper;