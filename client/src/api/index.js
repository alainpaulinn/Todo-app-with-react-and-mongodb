const serverUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export const getTasks = async () => {
    const response = await fetch(`${serverUrl}/tasks`);
    if (!response.ok) {
        throw new Error('Cannot get the tasks list');
    }
    return await response.json();
};

export const getTask = async (id) => {
    const response = await fetch(`${serverUrl}/tasks/${id}`);
    if (!response.ok) {
        throw new Error('Cannot get the task');
    }
    return await response.json();
};

export const addTask = async (title) => {
    const response = await fetch(`${serverUrl}/tasks`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            isCompleted: false,
        }),
    });
    if (!response.ok) {
        throw new Error('Cannot add the task');
    }
};

export const updateTask = async (id, taskData) => {
    const response = await fetch(`${serverUrl}/tasks/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    if (!response.ok) {
        throw new Error('Cannot modify the task');
    }
};

export const deleteTask = async (id) => {
    const response = await fetch(`${serverUrl}/tasks/${id}`, {
        method: 'delete',
    });
    if (!response.ok) {
        throw new Error('Cannot delete the task');
    }
};