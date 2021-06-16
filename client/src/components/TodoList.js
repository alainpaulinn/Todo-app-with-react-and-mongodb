import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as api from '../api';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTasks = () => api.getTasks().then(setTasks);

    useEffect(() => {
        setLoading(true);
        fetchTasks()
            .catch(setError)
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const setCompleted = (id, isCompleted) => {
        setLoading(true);
        api
            .updateTask(id, { isCompleted })
            .then(() => fetchTasks())
            .catch(setError)
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteTask = (id) => {
        setLoading(true);
        api
            .deleteTask(id)
            .then(() => fetchTasks())
            .catch(setError)
            .finally(() => {
                setLoading(false);
            });
    };

    const addTask = (title) => {
        setLoading(true);
        api
            .addTask(title)
            .then(() => fetchTasks())
            .catch(setError)
            .finally(() => {
                setLoading(false);
            });
    };

    if (error && error.message) {
        return (
            <div>
                <h1 style={{ color: 'red' }}>{error.message}</h1>
            </div>
        );
    }

    return (
        <div>
            <TodoForm addTask={addTask} />

            {loading ? (
                <CircularProgress
                    style={{
                        margin: '2em 50%',
                    }}
                />
            ) : (
                <List>
                    {tasks.map((task) => (
                        <TodoItem
                            key={task._id}
                            title={task.title}
                            taskId={task._id}
                            isCompleted={task.isCompleted}
                            onCompleted={() => setCompleted(task._id, !task.isCompleted)}
                            onDelete={() => deleteTask(task._id)}
                        />
                    ))}
                </List>
            )}
        </div>
    );
}

export default TodoList;