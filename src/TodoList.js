import React, {Component} from "react";
import TodoItems from './TodoItems';
import "./TodoList.css";
import SearchIcon from '@material-ui/icons/Search';
import { fontSize } from "@material-ui/system";

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {items:[]}
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.renameItem = this.renameItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.markCompleted = this.markCompleted.bind(this);
  }



  addItem(e) {
    //if item is not empty string create new item object and add
    if (this._inputElement !== "") {
      console.log('new item')

      var item = {
        text: this._inputElement.value,
        key:Date.now(), // get the time now as id
        completed: false
      };

      this.setState((prevState)=> {
        {/*get the last previous state add new item and return*/}
        return  {items:prevState.items.concat(item)};
      });
      //finally set the string to empty
      this._inputElement.value = ""
      e.preventDefault();
    }
  }
  deleteItem(key) {
    var filteredItems = this.state.items.filter(function(item) {
      return (item.key !== key)
    });
    this.setState({
      items:filteredItems
    })
  }
  renameItem(key) {
    var message = prompt("Rename to do task");
    const items = this.state.items;
    items.map(item => {
      if (item.key===key){
        item.text=message;
      }
    })
    this.setState({
      items:items
    })
  }

  markCompleted(key) {
    const items = this.state.items;
    items.map(item => {
      if(item.key === key) {
        item.completed = !item.completed;
      }
    })
    this.setState({
      items:items
    })
  }
  searchItem(e) {
    let currentL = []; // current list hold original version
    let newL = []; // new list holds filtered version
    if(e.target.value !== ""){
      console.log('Print wohoo at least it gets here')
      currentL = this.state.items; // hold list
      console.log(currentL)
      function check_search(item) {
        const str_check = item.text.toLowerCase();
        console.log(str_check)
        return (str_check.includes(e.target.value));
      }
      newL = currentL.filter(check_search)
      console.log(newL,'this are the elements')
    } else {
      newL = this.state.items;
    }
    this.setState({
      items:newL
    })
  }




  render() {
    return (<div className= "todoListMain">
              <div className="header">
                <form onSubmit={this.addItem}>
                  {/*when adding let the _inputElement method be the input*/}
                  <input
                    ref={ (a) => this._inputElement = a }
                    placeholder="enter to do ...">
                  </input>
                  <button type="submit"> add</button>
                </form>
                  <input placeholder="task to search .." onChange={this.searchItem}>
                  </input>
                  <button type="submit"> <SearchIcon style={{fontSize:15}} /></button>
            </div>
            <TodoItems entries={this.state.items}
                       delete={this.deleteItem}
                       edit={this.renameItem}
                       completed= {this.markCompleted}/>
          </div>





    );
  }
}

export default TodoList;
