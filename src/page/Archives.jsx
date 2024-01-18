import React from "react";
import SearchNote from "../components/SearchBar";
import NoteList from "../components/NoteList";
// import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";
import { getArchivedNotes, deleteNote, unarchiveNote } from "../utils/api";


import EmptyNote from "../components/EmptyNote";
import { TbArchiveOff } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";

// function ArchivesPageWrapper() {
//     const [searchParams, setSearchParams] = useSearchParams();

//     const search = searchParams.get("search");

//     function changeSearchParams(search) {
//         setSearchParams({
//             search,
//         });
//     }

//     return (
//         <ArchivesPage defaultKeyword={search} onSearchChange={changeSearchParams} />
//     );
// }

// class ArchivesPage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             notes: [],
//             search: props.defaultKeyword || "",
//         };

//         this.onNoteSearchHandler = this.onNoteSearchHandler.bind(this);
//         this.onDeleteHandler = this.onDeleteHandler.bind(this);
//         this.onUnarchiveHandler = this.onUnarchiveHandler.bind(this);
//     }

//     async componentDidMount() {
//         const { data } = await getArchivedNotes();

//         this.setState(() => {
//             return {
//                 notes: data
//             };
//         });
//     }

//     onNoteSearchHandler(search) {
//         this.setState(() => {
//             return {
//                 search,
//             };
//         });

//         this.props.onSearchChange(search);
//     }

//     async onDeleteHandler(id) {
//         await deleteNote(id);

//         const { data } = await getArchivedNotes();
//         this.setState(() => {
//             return {
//                 notes: data,
//             };
//         });
//     }

//     async onUnarchiveHandler(id) {
//         await unarchiveNote(id);

//         const { data } = await getArchivedNotes();
//         this.setState(() => {
//             return {
//                 notes: data,
//             };
//         });
//     }

//     render() {
//         const notes = this.state.notes.filter((note) => {
//             return note.title
//                 .toLowerCase()
//                 .includes(this.state.search.toLowerCase());
//         });

//         const archivedNotes = notes.filter(
//             (note) => note.archived === true
//         );

//         return (
//             <LocaleConsumer>
//                 {
//                     ({ locale }) => {
//                         return (
//                             <section className="main-content">
//                                 <div className="main">
//                                     <SearchNote
//                                         search={this.state.search}
//                                         onSearchChange={this.onNoteSearchHandler}
//                                     />
//                                     <div className="title">
//                                         <h2>{locale === "id" ? "Arsip" : "Archive"}</h2>
//                                     </div>
//                                     {archivedNotes.length ? (
//                                         <NoteList keyword={this.state.keyword} notes={archivedNotes} onDelete={this.onDeleteHandler} onUnarchive={this.onUnarchiveHandler} />
//                                     ) : (
//                                         <EmptyNote icon={<TbArchiveOff />} title={locale === "id" ? "Arsip Kosong" : "Archives are empty"} />
//                                     )}
//                                 </div>

//                             </section>
//                         );
//                     }
//                 }
//             </LocaleConsumer>
//         );
//     }
// }

// ArchivesPage.propTypes = {
//     defaultKeyword: PropTypes.string,
//     onSearchChange: PropTypes.func.isRequired,
// };

// export default ArchivesPageWrapper;


function ArchivesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [notes, setNotes] = React.useState([]);
    const [keyword, setKeyword] = React.useState(() => {
        return searchParams.get("keyword") || "";
    });

    const { locale } = React.useContext(LocaleContext);

    React.useEffect(() => {
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