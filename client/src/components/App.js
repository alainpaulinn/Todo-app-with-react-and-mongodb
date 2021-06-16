import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Header from './Header';
import Home from './Home';
import TodoList from './TodoList';
import TodoView from './TodoView';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Switch>
          <Route path="/list">
            <TodoList />
          </Route>
          <Route path="/task/:id">
            <TodoView />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </>
  );
}

export default App;