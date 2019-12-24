import React, {Component} from "react";
import TodoItems from './TodoItems';
import "./TodoList.css";
class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {items:[]}
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  addItem(e) {
    //if item is not empty string create new item object and add
    if (this._inputElement !== "") {
      var item = {
        text: this._inputElement.value,
        key:Date.now() // get the time now as id
      };

      this.setState((prevState)=> {
        {/*get the last previous state add new item and return*/}
        return  {items:prevState.items.concat(item)};
      });
      //finally set the string to empty
      this._inputElement.value = ""
      console.log(this.state.items);
      e.preventDefault();
    }
  }
  deleteItem(key) {
    var filteredItems = this.state.items.filter(function(item) {
      return (item.key !== key)
    });
    this.setState({
      items:filteredItems
    });
  }
  renameItem(key) {

  }

  render() {
    return (<div className= "todoListMain">
              <h1>To Do List app </h1>
              <div className="header">
                <form onSubmit={this.addItem}>
                  {/*when adding let the _inputElement method be the input*/}
                  <input textAlign={'center'}
                    ref={ (a) => this._inputElement = a }
                    placeholder="enter to do">
                  </input>
                  <button type="submit"> add</button>
                </form>
                <input textAlign={'center'} placeholder="task to search">
                </input>
                <button type="submit"> search </button>

            </div>
            <TodoItems entries={this.state.items}
                       delete={this.deleteItem}/>
          </div>
    );
  }
}

export default TodoList;
