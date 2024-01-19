import React from "react";
import { showFormattedDate } from "../utils";
import { FaSave } from "react-icons/fa";
import { RxReset } from "react-icons/rx";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { LocaleConsumer } from "../contexts/LocaleContext";

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      remainingChars: 50,
    };
  }

  onTitleChangeEventHandler = (event) => {
    const inputTitle = event.target.value;
    const remainingChars = 50 - inputTitle.length;

    remainingChars >= 0 ||
      event.nativeEvent.inputType === "deleteContentBackward"
      ? this.setState(() => ({
        title: inputTitle,
        remainingChars: remainingChars,
      }))
      : null;
  };

  onDescriptionChangeEventHandler = (event) => {
    this.setState(() => {
      return { body: event.target.value };
    });
  };

  onSubmitEventHandler = (event) => {
    event.preventDefault();
    this.props.addNote(this.state);

    this.setState({
      title: "",
      body: "",
      remainingChars: 50,
    });
  };

  render() {
    return (
      <LocaleConsumer>
        {
          ({ locale }) => {
            return (
              <form
                className="container-note_input"
                onSubmit={this.onSubmitEventHandler}
              >
                <div className="note-input">
                  <input
                    className="note-input__title"
                    type="text"
                    name="title"
                    id="title"
                    placeholder={locale === "id" ? "Judul" : "Title"}
                    value={this.state.title}
                    onChange={this.onTitleChangeEventHandler}
                  />
                  <div className="note-input__remainingChar">
                    <div className="date">{showFormattedDate(new Date(), "short")}</div>
                    |{" "}
                    <b
                      style={{
                        color: this.state.remainingChars <= 10 ? "red" : "green",
                      }}
                    >
                      {locale === "id" ? "Karakter judul tersisa: " : "Title characters remaining:  "}
                      {this.state.remainingChars}
                    </b>
                  </div>
                  <textarea
                    className="note-input__body"
                    name="body"
                    id="body"
                    placeholder={locale === "id" ? "Buat catatan ..." : "Start typing..."}
                    value={this.state.body}
                    onChange={this.onDescriptionChangeEventHandler}
                  />
                  <div className="button-input">
                    <button type="submit" className="button_submit">
                      {locale === "id" ? "Simpan" : "Save"}
                      <FaSave className="addButton" />
                    </button>
                    <div
                      className="button_reset"
                    >
                      <Link to="/">
                        {locale === "id" ? "Batal" : "Cancel"}
                        <RxReset className="Xbutton" />
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            );
          }
        }
      </LocaleConsumer>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
