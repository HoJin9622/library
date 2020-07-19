import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 6rem 0;
`;

const ListContainer = styled.ul`
  display: flex;
`;

const List = styled.li``;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  padding: ${(props) => (props.title ? '' : '1rem')};
  font-size: ${(props) => (props.title ? '3rem' : '1.8rem')};
  font-weight: ${(props) => (props.title ? 'bold' : '300')};
`;

export default () => {
  return (
    <NavContainer>
      <StyledLink title to='/'>
        Library
      </StyledLink>
      <ListContainer>
        <List>
          <StyledLink to='/authors'>Authors</StyledLink>
        </List>
        <List>
          <StyledLink to='/authors/new'>Add Author</StyledLink>
        </List>
        <List>
          <StyledLink to='/books'>Books</StyledLink>
        </List>
        <List>
          <StyledLink to='/authors/new'>Add Book</StyledLink>
        </List>
      </ListContainer>
    </NavContainer>
  );
};
