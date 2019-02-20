import React, { Component } from 'react';
import _ from 'lodash';
import { Icon, Button, Table } from 'semantic-ui-react';
import { formatJSONDate } from '../../tools/tools';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      direction: null
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  handleSort = clickedColumn => () => {
    const { transformDataSource, dataSource } = this.props;
    const { column, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: 'ascending'
      });

      transformDataSource(_.sortBy(dataSource, [clickedColumn]));

      return;
    }

    this.setState({
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    });

    transformDataSource(dataSource.reverse());
  };

  render() {
    const { dataSource } = this.props;
    const { column, direction } = this.state;
    const styles = {
      table: {
        width: '98%',
        margin: '0 auto',
        textAlign: 'center',
        boxShadow: '0 1px 20px -8px rgba(0,0,0,.5)'
      },
      link: {
        color: '#fff'
      },
      noDemo: {
        cursor: 'not-allowed'
      }
    };
    return (
      <Table celled selectable style={styles.table} inverted sortable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={this.handleSort('name')}
            >
              <Icon name="briefcase" />
              Name
            </Table.HeaderCell>
            <Table.HeaderCell collapsing width={4}>
              <Icon name="info" />
              Introduction
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'created_at' ? direction : null}
              onClick={this.handleSort('created_at')}
            >
              <Icon name="clock" />
              Created Date
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'updated_at' ? direction : null}
              onClick={this.handleSort('updated_at')}
            >
              <Icon name="arrow circle up" />
              Updated Date
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Icon name="linkify" />
              Link
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'stargazers_count' ? direction : null}
              onClick={this.handleSort('stargazers_count')}
            >
              <Icon name="star" />
              Stargazers Count
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'forks_count' ? direction : null}
              onClick={this.handleSort('forks_count')}
            >
              <Icon name="fork" />
              Forks Count
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'fork' ? direction : null}
              onClick={this.handleSort('fork')}
            >
              <Icon name="cloud download" />
              Is Fork?
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {Object.keys(dataSource).map(key => (
            <Table.Row key={key}>
              <Table.Cell style={{ textAlign: 'left' }}>
                {dataSource[key].name}
              </Table.Cell>
              <Table.Cell style={{ textAlign: 'left' }}>
                {dataSource[key].description}
              </Table.Cell>
              <Table.Cell>
                {formatJSONDate(dataSource[key].created_at)}
              </Table.Cell>
              <Table.Cell>
                {formatJSONDate(dataSource[key].updated_at)}
              </Table.Cell>
              <Table.Cell>
                <Button.Group
                  style={!dataSource[key].homepage ? styles.noDemo : null}
                >
                  <Button primary>
                    <a
                      href={dataSource[key].html_url}
                      style={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </Button>
                  <Button.Or />
                  <Button positive disabled={!dataSource[key].homepage}>
                    <a
                      href={dataSource[key].homepage}
                      style={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Demo
                    </a>
                  </Button>
                </Button.Group>
              </Table.Cell>
              <Table.Cell>{dataSource[key].stargazers_count}</Table.Cell>
              <Table.Cell>{dataSource[key].forks_count}</Table.Cell>
              <Table.Cell>{dataSource[key].fork ? 'Yes' : 'No'}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  }
}

export default Content;
