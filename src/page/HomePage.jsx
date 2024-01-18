import React from "react";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/api";
import NoteList from "../components/NoteList";
import SearchNote from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
// import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";
import EmptyNote from "../components/EmptyNote";
import { MdOutlineSubtitlesOff } from "react-icons/md";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = React.useState([]);
  const [keyword, setKeyword] = React.useState(() => {
    return searchParams.get("keyword") || "";
  });

  const { locale } = React.useContext(LocaleContext);

  React.useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
    });
  }, []);

  async function onDeleteHandler(id) {
    await deleteNote(id);

    const { data } = await getActiveNotes();
    setNotes(data);
  }

  async function onArchiveHandler(id) {
    await archiveNote(id);

    const { data } = await getActiveNotes();
    setNotes(data);
  }

  function onKeywordChangeHandler(keyword) {
    setKeyword(keyword);
    setSearchParams({ keyword });
  }

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(
      keyword.toLowerCase()
    );
  });

  const activeNotes = filteredNotes.filter((note) => {
    return note.archived === false;
  });

  return (
    <section className="main-content">
      <div className="main">
        <SearchNote
          search={keyword}
          onSearchChange={onKeywordChangeHandler}
        />
        <div className="title">
          <h2>{locale === "id" ? "Daftar Catatan" : "All Notes"}</h2>
        </div>
        {activeNotes.length ? (
          <NoteList
            notes={activeNotes}
            onDelete={onDeleteHandler}
            onArchive={onArchiveHandler}
          />
        ) : (
          <EmptyNote icon={<MdOutlineSubtitlesOff />} title={locale === "id" ? "Catatan Kosong" : "Notes empty"} />
        )}
      </div>
    </section>
  );

}

export default HomePage;