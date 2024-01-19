import React, { useState, useEffect, useContext } from "react";
import SearchNote from "../components/SearchBar";
import NoteList from "../components/NoteList";
import LocaleContext from "../contexts/LocaleContext";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/api";
import Loading from "../components/Loading";

import EmptyNote from "../components/EmptyNote";
import { TbArchiveOff } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";

function ArchivesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = useState([]);
    const [keyword, setKeyword] = useState(() => {
        return searchParams.get("keyword") || "";
    });
    const [loading, setLoading] = useState(false);

    const { locale } = useContext(LocaleContext);

    useEffect(() => {
        getArchivedNotes().then(({ data }) => {
            setNotes(data);
        });
    }, []);

    async function onDeleteHandler(id) {
        await deleteNote(id);

        const { data } = await getArchivedNotes();
        setNotes(data);
    }

    async function onUnarchiveHandler(id) {
        await unarchiveNote(id);

        const { data } = await getArchivedNotes();
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

    const archivedNotes = filteredNotes.filter((note) => {
        return note.archived === true;
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
                    <h2>{locale === "id" ? "Arsip" : "Archive"}</h2>
                </div>
                {loading && (
                    <Loading />
                )}
                {archivedNotes.length ? (
                    <NoteList notes={archivedNotes} onDelete={onDeleteHandler} onUnarchive={onUnarchiveHandler} />
                ) : (
                    <EmptyNote icon={<TbArchiveOff />} title={locale === "id" ? "Arsip Kosong" : "Archives are empty"} />
                )}
            </div>

        </section>
    );
}

export default ArchivesPage;