import React, { Component } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import axios from "axios";

const MessageContainer = styled.div`
  position: fixed;
  width: calc(100% - 350px);
  top: 0;
  left: 350px;
  background: mediumseagreen;
  color: white;
  padding: 1rem;
  opacity: 1;
  animation: fadeIn 0.25s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      top: -3rem;
    }

    to {
      opacity: 1;
      top: 0;
    }
  }
`;

class Note extends Component {
  constructor() {
    super();
    this.state = {
      note: {},
      title: "",
      text: "",
      message: ""
    };

    this.updateText = this.updateText.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    this.retrieveNoteData(match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    this.retrieveNoteData(match.params.id);
  }

  retrieveNoteData(id) {
    axios
      .get(`http://localhost:5000/note/${id}`)
      .then(response => {
        this.setState({
          note: response.data,
          title: response.data.title,
          text: response.data.text
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Functions for updating the 2 data sections (title and text)
  updateText(e) {
    this.setState({ text: e.target.value });
  }

  updateTitle(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    const { note, title, text } = this.state;
    const { saveText, message } = this.props;

    return (
      <div style={{ overflow: "auto" }}>
        <input
          style={{ fontWeight: "bolder", fontSize: "2.5em" }}
          type="text"
          value={title}
          onChange={this.updateTitle}
        />
        {/* <textarea type="text" value={text} onChange={this.updateText} /> */}
        <TextareaAutosize
          value={text}
          onChange={this.updateText}
          placeholder="Start writing here..."
        />
        <br />
        <button
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            background: "mediumseagreen",
            color: "white",
            padding: ".85rem 2rem",
            cursor: "pointer",
            border: "none",
            borderRadius: "3px",
            fontSize: "1em"
          }}
          onClick={() => saveText(note, title, text)}
        >
          Save
        </button>

        {message && (
          <MessageContainer>
            <h4>{message}</h4>
          </MessageContainer>
        )}
      </div>
    );
  }
}

export default Note;
