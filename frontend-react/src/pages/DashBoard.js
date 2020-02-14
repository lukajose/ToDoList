import Header from '../Header';
import TodoList from '../TodoList';
import React from 'react';

class DashBoardPage extends React.Component {
    render () {
        return (
            <div>
                <Header/>
                <TodoList/>
            </div>
        );
    }
}

export default DashBoardPage;