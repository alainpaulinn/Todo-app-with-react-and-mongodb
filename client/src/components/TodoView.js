import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    AutoForm,
    AutoField,
    ErrorsField,
    LongTextField,
    SubmitField,
} from 'uniforms-material';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import * as api from '../api';
import { bridge as schema } from '../schema/todo';

function TodoView() {
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTask = () => api.getTask(id).then(setTask);

    useEffect(() => {
        setLoading(true);
        fetchTask()
            .catch(setError)
            .finally(() => {
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = (formData) => {
        console.log(formData);
        const { _id, ...taskData } = formData;
        setLoading(true);
        api
            .updateTask(_id, taskData)
            .catch(setError)
            .finally(() => {
                setLoading(false);
            });
    };

    if (loading || !task) {
        return (
            <div>
                <h1>Loading…</h1>
            </div>
        );
    }

    if (error && error.message) {
        return (
            <div>
                <h1 style={{ color: 'red' }}>{error.message}</h1>
            </div>
        );
    }

    return (
        <Paper
            style={{
                padding: '2em',
                margin: '2em',
            }}>
            <Typography variant="h4">Edit the todo item</Typography>
            <AutoForm schema={schema} model={task} onSubmit={onSubmit}>
                <AutoField name="title" />
                <AutoField name="isCompleted" />
                <AutoField name="assignedUser" />
                <LongTextField name="description" rows={5} />
                <ErrorsField />
                <SubmitField label="Save the todo item" />
            </AutoForm>
        </Paper>
    );
}

export default TodoView;