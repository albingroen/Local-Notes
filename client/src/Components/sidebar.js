import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarWrapper = styled.div`
  height: 100vh;
  width: 350px;
  background: #f4f4f4;
  padding: 2rem;
  position: fixed;
  top: 0;
  left: 0;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  list-style-type: none;
  padding-top: 20px;
`;

const ListItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;
  opacity: 0.6;
  position: relative;
  &:hover {
    opacity: 1;
    background: #eee;
    border-radius: 3px;

    > i {
      opacity: 1;
      &:hover {
        color: orangered;
      }
    }
  }

  > i {
    opacity: 0;
    margin-left: 4rem;
    position: absolute;
    right: 1rem;
  }
`;

class Sidebar extends Component {
  render() {
    const { notes, newNote, deleteNote } = this.props;

    return (
      <SidebarWrapper>
        <h3>Notes</h3>
        <List>
          {notes.map(note => {
            return (
              <Link key={note._id} to={`/note/${note._id}`}>
                <ListItem>
                  - {note.title}
                  <i>
                    <FontAwesomeIcon
                      onClick={() => deleteNote(note._id)}
                      icon={faTrashAlt}
                    />
                  </i>
                </ListItem>
              </Link>
            );
          })}
        </List>
        <button
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "2rem",
            background: "#222",
            color: "white",
            padding: ".85rem 2rem",
            cursor: "pointer",
            border: "none",
            borderRadius: "3px",
            fontSize: "1em"
          }}
          onClick={newNote}
        >
          New note
        </button>
      </SidebarWrapper>
    );
  }
}

export default Sidebar;
