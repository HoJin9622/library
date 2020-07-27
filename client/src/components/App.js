import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import NavBar from './NavBar';
import Home from '../routes/Home';
import Authors from '../routes/Authors';
import Books from '../routes/Books';
import NewAuthor from '../routes/NewAuthor';
import EditAuthor from '../routes/EditAuthor';
import NewBook from '../routes/NewBook';
import ViewAuthor from '../routes/ViewAuthor';
import ViewBook from '../routes/ViewBook';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400;500;700;900&display=swap');

  body {
    font-family: 'Frank Ruhl Libre', serif;
    font-size: 20px;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  margin-bottom: 3rem;
`;

const InnerContainer = styled.div`
  margin: 0 2rem;
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Container>
        <NavBar />
        <InnerContainer>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/authors' component={Authors} />
            <Route exact path='/authors/new' component={NewAuthor} />
            <Route exact path='/authors/:id' component={ViewAuthor} />
            <Route exact path='/authors/:id/edit' component={EditAuthor} />
            <Route exact path='/books' component={Books} />
            <Route exact path='/books/new' component={NewBook} />
            <Route exact path='/books/:id' component={ViewBook} />
          </Switch>
        </InnerContainer>
      </Container>
    </Router>
  );
}

export default App;
