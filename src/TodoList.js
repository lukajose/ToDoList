import React, {Component} from "react";
import TodoItems from './TodoItems';
import "./TodoList.css";
class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {items:[]}
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.renameItem = this.renameItem.bind(this);
    this.searchItem = this.searchItem.bind(this);
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
  searchItem(e) {
    e.preventDefault()
    if(this._search.value !== ""){
      var filteredItems = this.state.items.filter(function(item) {
        return (item.text.search(this._search.value))
      });
      this._search = ""

      return (<TodoItems entries={filteredItems}
                 delete={this.deleteItem}
                 edit={this.renameItem} />);
    } else {
      return (<TodoItems entries={this.state.items}
                 delete={this.deleteItem}
                 edit={this.renameItem}/>)
    }

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
                <form onSubmit={this.searchItem}>
                  <input ref= {(b) => this._search =b} placeholder="task to search ..">
                  </input>
                  <button type="submit"> search </button>
                </form>

            </div>
            <TodoItems entries={this.state.items}
                       delete={this.deleteItem}
                       edit={this.renameItem} />
          </div>





    );
  }
}

export default TodoList;
