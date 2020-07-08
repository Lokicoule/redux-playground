import React, { Component } from 'react';
import StoreContext from '../contexts/storeContexts';
import { loadTasks } from '../store/tasks';

class Tasks extends Component {
    static contextType = StoreContext;

    state = {tasks: []};

    componentDidMount(){
        const store = this.context;

        this.unsubscribe = store.subscribe(() => {
            const tasksInStore = store.getState().entities.tasks.list;
            
            if (tasksInStore !== this.state.tasks) this.setState({tasks: tasksInStore})
        });

        store.dispatch(loadTasks());
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        return <ul>{
            this.state.tasks.map((task) => <li key={task.id}>{task.description}</li>)
            }</ul>;
    }
}

export default Tasks;