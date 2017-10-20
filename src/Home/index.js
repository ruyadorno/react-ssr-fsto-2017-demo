import React, { Component } from 'react';
import { Header, Menu, Segment } from 'semantic-ui-react'

import LibList from './LibList';

class Home extends Component {
  render() {
    return (
      <div style={{padding: '2rem'}}>
        <Menu pointing>
          <Menu.Item name='home' active />
        </Menu>
        <Segment>
          <Header as="h2">CDNJS libraries</Header>
          <LibList { ...this.props } />
        </Segment>
      </div>
    );
  }
}

export default Home;
