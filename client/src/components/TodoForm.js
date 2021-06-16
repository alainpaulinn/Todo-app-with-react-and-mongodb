import { AutoForm, TextField } from 'uniforms-material';

import createBridge from '../lib/createBridge';

export const schema = createBridge({
    title: 'Add new form',
    type: 'object',
    properties: {
        title: { type: 'string', minLength: 3 },
    },
    required: ['title'],
});

function TodoForm({ addTask }) {
    const onSubmit = (data) => {
        addTask(data.title);
    };

    return (
        <AutoForm schema={schema} onSubmit={onSubmit}>
            <TextField
                name="title"
                label="Add new task…"
                variant="filled"
                fullWidth
            />
        </AutoForm>
    );
}

export default TodoForm;