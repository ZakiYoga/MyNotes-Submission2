import React, { useEffect, useState, useContext } from "react";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/api";
import NoteList from "../components/NoteList";
import SearchNote from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";
import EmptyNote from "../components/EmptyNote";
import { MdOutlineSubtitlesOff } from "react-icons/md";
import Loading from "../components/Loading";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState(() => {
    return searchParams.get("keyword") || "";
  });
  const [loading, setLoading] = useState(false);

  const { locale } = useContext(LocaleContext);

  useEffect(() => {
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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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
        {loading && (
          <section className="main-content">
            <div className="main">
              <Loading />
            </div>
          </section>
        )}
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