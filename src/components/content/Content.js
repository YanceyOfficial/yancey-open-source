import React, { Component } from 'react';
import _ from 'lodash';
import { Icon, Button, Table, Input } from 'semantic-ui-react';
import { formatJSONDate, sizeFormat } from '../../tools/tools';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      direction: null,
      inputText: ''
    };
  }

  onSearchChange = e => {
    const input = e.target.value.toLowerCase();
    this.setState({
      inputText: input
    });
  };

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
    const { column, direction, inputText } = this.state;
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
      },
      input: {
        marginLeft: '1%',
        marginBottom: '1%',
        width: '300px'
      }
    };
    return (
      <>
        <Input
          style={styles.input}
          icon="search"
          iconPosition="left"
          placeholder="Search..."
          onChange={e => this.onSearchChange(e)}
        />
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
                sorted={column === 'size' ? direction : null}
                onClick={this.handleSort('size')}
              >
                <Icon name="database" />
                Size
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
                Is Fork ?
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dataSource
              .filter(
                data =>
                  !inputText ||
                  data.name.toLowerCase().includes(inputText.toLowerCase())
              )
              .map((value, key) => (
                <Table.Row key={key}>
                  <Table.Cell
                    style={{
                      textAlign: 'left'
                    }}
                  >
                    {value.name}
                  </Table.Cell>
                  <Table.Cell
                    style={{
                      textAlign: 'left'
                    }}
                  >
                    {value.description}
                  </Table.Cell>
                  <Table.Cell> {formatJSONDate(value.created_at)} </Table.Cell>
                  <Table.Cell> {formatJSONDate(value.updated_at)} </Table.Cell>
                  <Table.Cell>
                    <Button.Group
                      style={!value.homepage ? styles.noDemo : null}
                    >
                      <Button primary>
                        <a
                          href={value.html_url}
                          style={styles.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </a>
                      </Button>
                      <Button.Or />
                      <Button positive disabled={!value.homepage}>
                        <a
                          href={value.homepage}
                          style={styles.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Demo
                        </a>
                      </Button>
                    </Button.Group>
                  </Table.Cell>
                  <Table.Cell> {sizeFormat(value.size)} </Table.Cell>
                  <Table.Cell> {value.stargazers_count} </Table.Cell>
                  <Table.Cell> {value.forks_count} </Table.Cell>
                  <Table.Cell> {value.fork ? 'Yes' : 'No'} </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </>
    );
  }
}

export default Content;
