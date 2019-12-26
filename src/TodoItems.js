import React, {Component} from 'react';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
class TodoItems extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.entries)
    this.createTasks = this.createTasks.bind(this)
  }


  createTasks(item){
    return (<li>
              {item.text}
              <span>
                <EditIcon onClick= {() => this.rename(item.key)}
                            key={item.key}/>
                <DeleteIcon onClick= {() => this.delete(item.key)}
                            key={item.key} />
              </span>
            </li>

          )
  }

  delete(key) {
    this.props.delete(key);
  }

  rename(key) {
    this.props.edit(key);
  }


  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);

    return (
      <ul className="theList">
         {listItems}
      </ul>

    );
  }
}

export default TodoItems;
