import React from 'react';
import FlexView from 'react-flexview';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
  <Link to="/"><FlexView vAlignContent='center' hAlignContent='center'>Home</Flexview></Link>

    <hr />
  </header>
);

export default Header;
