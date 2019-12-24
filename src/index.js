import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import TodoList from './TodoList.js';
var destination = document.querySelector('#container')
ReactDOM.render(
  <div> <TodoList/> </div>,
  destination);
