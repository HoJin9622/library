import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../routes/Home';
import Authors from '../routes/Authors';
import Books from '../routes/Books';
import NewAuthor from '../routes/NewAuthor';
import NewBook from '../routes/NewBook';
import ViewAuthor from '../routes/ViewAuthor';
import ViewBook from '../routes/ViewBook';

function App() {
  return (
    <Router>
      <nav>Library</nav>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/authors' component={Authors} />
        <Route exact path='/authors/new' component={NewAuthor} />
        <Route exact path='/authors/:id' component={ViewAuthor} />
        <Route exact path='/books' component={Books} />
        <Route exact path='/books/new' component={NewBook} />
        <Route exact path='/books/:id' component={ViewBook} />
      </Switch>
    </Router>
  );
}

export default App;
