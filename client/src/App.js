import React from "react";
import { injectGlobal } from "styled-components";
import Routes from "./routes";

injectGlobal`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background: white;
    color: #222;
  }

  a {
    text-decoration: none;
    color: #222;
  }

  textarea, input {
    transition: .2s ease-out 0s;
    font-size: 1.1em;
    opacity: .8;
    line-height: 1.5em;
    letter-spacing: .3px;
    border: none;
    width: 100%;
    &:focus {
      outline: none;
      transition: .2s ease-out 0s;
    }
  }

  textarea {
    margin-top: 25px;    
  }
`;

export default () => <Routes />;
