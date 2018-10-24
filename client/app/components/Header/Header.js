import React from 'react';
import FlexView from 'react-flexview';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
  <FlexView vAlignContent='center' hAlignContent='center'>  <Link to="/">Home</Link></Flexview>

    <hr />
  </header>
);

export default Header;
