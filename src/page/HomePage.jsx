import React from "react";
import { getActiveNotes, deleteNote, archiveNote } from "../utils/api";
import NoteList from "../components/NoteList";
import SearchNote from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
// import PropTypes from "prop-types";
import LocaleContext from "../contexts/LocaleContext";
import EmptyNote from "../components/EmptyNote";
import { MdOutlineSubtitlesOff } from "react-icons/md";


// function NoteAppWrapper() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const search = searchParams.get("search");

//   function changeSearchParams(search) {
//     setSearchParams({ search });
//   }

//   return (
//     <NoteApp defaultKeyword={search} onSearchChange={changeSearchParams} />
//   );

// }

// class NoteApp extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       page: "/",
//       notes: [],
//       search: props.defaultKeyword || "",
//     };

//     this.onNoteSearchHandler = this.onNoteSearchHandler.bind(this);
//     this.onDeleteHandler = this.onDeleteHandler.bind(this);
//     this.onArchiveHandler = this.onArchiveHandler.bind(this);
//   }

//   async componentDidMount() {
//     const { data } = await getActiveNotes();

//     this.setState(() => {
//       return {
//         notes: data
//       };
//     });
//   }


//   onNoteSearchHandler(search) {
//     this.setState(() => {
//       return {
//         search,
//       };
//     });

//     this.props.onSearchChange(search);
//   }

//   async onDeleteHandler(id) {
//     await deleteNote(id);

//     const { data } = await getActiveNotes();
//     this.setState(() => {
//       return {
//         notes: data,
//       };
//     });
//   }

//   async onArchiveHandler(id) {
//     await archiveNote(id);

//     const { data } = await getArchivedNotes();
//     this.setState(() => {
//       return {
//         notes: data,
//       };
//     });
//   }

//   onUnarchiveHandler(id) {
//     unarchiveNote(id);

//     this.setState((prevState) => {
//       return {
//         notes: getActiveNotes().filter((note) =>
//           note.title.toLowerCase().includes(prevState.search.toLowerCase()) && !note.archived
//         ),
//       };
//     });
//   }

//   render() {
//     const notes = this.state.notes.filter((note) => {
//       return note.title.toLowerCase().includes(this.state.search.toLowerCase());
//     });
//     const onarchive = notes.filter((note) => {
//       return note.archived === false;
//     });

//     return (
//       <LocaleConsumer>
//         {
//           ({ locale }) => {
//             return (
//               <section className="main-content">
//                 <div className="main">
//                   <SearchNote
//                     showSearch={this.state.showSearch}
//                     search={this.state.search}
//                     onSearchChange={this.onNoteSearchHandler}
//                     isSearchVisible={this.state.isSearchVisible}
//                     toggleSearch={this.toggleSearch}
//                   />
//                   <div className="title">
//                     <h2>{locale === "id" ? "Daftar Catatan" : "All Notes"}</h2>
//                   </div>
//                   {onarchive.length ? (
//                     <NoteList
//                       keyword={this.state.keyword}
//                       notes={onarchive}
//                       onDelete={this.onDeleteHandler}
//                       onArchive={this.onArchiveHandler}
//                     />
//                   ) : (
//                     <EmptyNote icon={<MdOutlineSubtitlesOff />} title={locale === "id" ? "Catatan Kosong" : "Notes empty"} />
//                   )}
//                 </div>
//               </section>
//             );
//           }
//         }
//       </LocaleConsumer>
//     );
//   }
// }

// NoteApp.propTypes = {
//   defaultKeyword: PropTypes.string,
//   onSearchChange: PropTypes.func.isRequired,
// };

// export default NoteAppWrapper;

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