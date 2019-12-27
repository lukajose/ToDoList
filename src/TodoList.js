import React, {Component} from "react";
import TodoItems from './TodoItems';
import "./TodoList.css";
import SearchIcon from '@material-ui/icons/Search';


class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {items:[], search:[]}
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.renameItem = this.renameItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.markCompleted = this.markCompleted.bind(this);
  }

  

  addItem(e) {
    //if new item then add to items list
    if (this._inputElement !== "") {
      var item = {
        text: this._inputElement.value, // text to store from input box
        key:Date.now(), // get the time now as id
        completed: false // to format style later when task completed
      };
      var newS = this.state.search;
      if(!this.isSearchEmpty(this.state.search)) {
        newS = newS.concat(item) // include to update state when searching
      }

      this.setState((prevState)=> {
        {/*get the last previous state add new item, update search item if needed*/}
        return  {items:prevState.items.concat(item),search:newS};
      });
      //finally set the string to empty
      this._inputElement.value = ""
      e.preventDefault(); // avoid default option
      
    }
  }
  //filters items and returns everything except the item with that key
  deleteItem(key) {
    //filter condition
    function delete_filter(item) {
      return (item.key !== key);
    }
    const filteredItems = this.state.items.filter(delete_filter);
    var newS = this.state.search;
    if(!this.isSearchEmpty(this.state.search)) {
      newS = this.state.search.filter(delete_filter) // include to update state when searching
    }
    
    this.setState({
      items:filteredItems,
      search:newS
    })
  }
  // when click prompt will ask for new message and rename that item
  renameItem(key) {
    var message = prompt("Rename to do task");
    const items = this.state.items;
    items.map(item => {
      if (item.key===key){
        return item.text=message;
      }
    })
    this.setState({
      items:items
    })
  }
  //gets the key and marks the task as completed will change the style when boolean is true
  markCompleted(key) {
    const items = this.state.items;
    items.map(item => {
      if(item.key === key) {
        return item.completed = !item.completed;
      }
    })
    this.setState({
      items:items
    })
  }

  isSearchEmpty(Ar) {
    return (Array.isArray(Ar) && Ar.length)? false : true;
  }
  searchItem(e) { 
    // current list hold original version
    let newL = []; // new list holds filtered version
    let currentL = this.state.search;
    if(e.target.value !== "") {
      if(this.isSearchEmpty(this.state.search)) {
        currentL = this.state.items; //save initial state
      }
      //Search filter based on input
      function check_search(item) {
        const str_check = item.text.toLowerCase();
        return (str_check.includes(e.target.value));
      }
      //apply filter

      newL = currentL.filter(check_search);
    } else {
      //we want to display original list if search is empty if not then search result
      let searchA = this.state.search;
      (Array.isArray(searchA) && searchA.length)? newL = this.state.search : newL = this.state.items; // condition to check what to update
      currentL = []
    }
    this.setState({
      items:newL,
      search:currentL // update the state
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
