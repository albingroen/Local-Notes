import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Sidebar from "./Components/sidebar";

// Import all your pages created in the Pages directory here
import Start from "./Pages/Start";
import Note from "./Pages/Note";

const Template = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Content = styled.div`
  width: calc(100% - 350px);
  min-height: 100vh;
  padding: 100px;
  overflow-y: scroll;
  margin-left: 350px;
`;

export default class Routes extends React.Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/note")
      .then(response => {
        this.setState({ notes: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  newNote() {
    axios
      .post("http://localhost:5000/note")
      .then(response => {
        this.setState({ notes: response.data });
      })
      .catch(err => console.log(err));
  }

  deleteNote(noteId) {
    axios
      .delete(`http://localhost:5000/note/${noteId}/delete`)
      .then(response => this.setState({ notes: response.data }))
      .catch(err => console.log(err));
  }

  saveText(note, title, text) {
    axios
      .post("http://localhost:5000/note/update", {
        note: note,
        title: title,
        text: text
      })
      .then(response => {
        this.setState({
          notes: response.data.notes,
          message: response.data.msg
        });
        setTimeout(() => {
          this.setState({ message: "" });
        }, 1200);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <BrowserRouter>
        <Template>
          <Sidebar
            deleteNote={noteId => this.deleteNote(noteId)}
            newNote={() => this.newNote()}
            notes={this.state.notes}
          />
          <Content>
            <Switch>
              <Route
                path="/"
                exact
                component={() => <Start notes={this.state.notes} />}
              />
              <Route
                path="/note/:id"
                exact
                message={this.state.message}
                component={props => (
                  <Note
                    {...props}
                    message={this.state.message}
                    saveText={(note, title, text) =>
                      this.saveText(note, title, text)
                    }
                  />
                )}
              />
            </Switch>
          </Content>
        </Template>
      </BrowserRouter>
    );
  }
}
