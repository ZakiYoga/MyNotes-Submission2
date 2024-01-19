import React, { useContext } from "react";
import NoteInput from "../components/NoteInput";
import { addNote } from "../utils/api";
import { useNavigate } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";


function AddNotePage() {
    const { locale } = useContext(LocaleContext);
    const navigate = useNavigate();

    async function onAddNoteHandler(note) {
        await addNote(note);
        navigate("/");
    }

    return (
        <section className="main">
            <div className="note-item__addNotePage">
                <div className="title">
                    <h2>{locale === "id" ? "Buat Catatan Baru" : "Create New Note"}</h2>
                </div>
                <NoteInput addNote={onAddNoteHandler} />
            </div>
        </section>
    );

}

export default AddNotePage;
