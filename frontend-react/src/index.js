import React from 'react';
import ReactDOM from 'react-dom';
import Header from "./Header";
//import * as serviceWorker from './serviceWorker';
import TodoList from './TodoList.js';
import Login from './pages/Login';
import RegisterPage from './pages/Register';

var destination = document.querySelector('#container')
ReactDOM.render(
  <div>
  <Login/>
  </div>,
  destination);

/*
<Header /> 
<TodoList/>

*/