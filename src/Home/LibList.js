import React, { Component } from 'react';
import { Input, Table } from 'semantic-ui-react';
import bind from '../bind-component';

class LibList extends Component {
  static displayName = 'LibList';

  constructor(props) {
    super(props);
    const { results, total } = props;
    this.initState = this.state = {
      results,
      total
    };
  }

  handleChange = (e, data) => {
    const results = this.initState.results.filter(item => item.name.indexOf(data.value) > -1);
    this.setState({
      results,
      total: results.length
    });
  }

  render() {
    const { results, total } = this.state;
    return (
      <div>
        <p><strong>Total:</strong> { total }</p>
        <Input placeholder="Filter..." onChange={this.handleChange} />
        <Table striped>
          <Table.Body>
            { results.map(item => (
              <Table.Row key={item.name}>
                <Table.Cell>{ item.name }</Table.Cell>
              </Table.Row>
            )) }
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default bind(LibList);

