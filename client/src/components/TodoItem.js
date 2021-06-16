import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function TodoItem({ title, taskId, isCompleted, onCompleted, onDelete }) {
    return (
        <ListItem dense>
            <ListItemIcon>
                <Checkbox edge="start" checked={isCompleted} onClick={onCompleted} />
            </ListItemIcon>
            <ListItemText primary={title} />
            <ListItemSecondaryAction>
                <IconButton edge="end" component={Link} to={`/task/${taskId}`}>
                    <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default TodoItem;