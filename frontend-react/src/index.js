import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./Header";
//import * as serviceWorker from './serviceWorker';
import TodoList from './TodoList.js';
import App from './App';

var destination = document.querySelector('#root')
ReactDOM.render(
  <div>
    <App/>
  </div>,
  destination);

/*
<Header /> 
<TodoList/>

*/