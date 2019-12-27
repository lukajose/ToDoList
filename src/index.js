import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./Header";
//import * as serviceWorker from './serviceWorker';
import TodoList from './TodoList.js';
import "./index.css";
var destination = document.querySelector('#container')
ReactDOM.render(
  <div>
    <Header /> 
    <TodoList/>
  </div>,
  destination);
