import React, { Component } from 'react';
import { Header, Menu, Segment, Table } from 'semantic-ui-react'

class Lib extends Component {
  render() {
    const { name } = this.props;
    const results = [
      'name',
      'version',
      'description',
      'author',
      'filename',
      'homepage'
    ].map(key => ({
      name: key,
      value: this.props[key]
    }));

    return (
      <div style={{padding: '2rem'}}>
        <Menu pointing>
          <Menu.Item name="home" href="/" />
          <Menu.Item name={name} active href={`/libs/${name}`} />
        </Menu>
        <Segment>
          <Header as="h2">{name}</Header>
          <Table celled striped>
            <Table.Body>
              { results.map(item => (
                <Table.Row key={item.name}>
                  <Table.Cell>
                    { item.name }
                  </Table.Cell>
                  <Table.Cell>
                    { item.value }
                  </Table.Cell>
                </Table.Row>
              )) }
            </Table.Body>
          </Table>
        </Segment>
      </div>
    );
  }
}

export default Lib;
