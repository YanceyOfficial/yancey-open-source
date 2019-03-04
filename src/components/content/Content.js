import React, { Component } from 'react';
import _ from 'lodash';
import { Icon, Button, Table, Form, Input, Select } from 'semantic-ui-react';
import { DatesRangeInput } from 'semantic-ui-calendar-react';
import { formatJSONDate, sizeFormat, isBetween } from '../../tools/tools';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      direction: null,
      inputValue: '',
      dateType: [
        { key: 'created_at', text: 'Created Date', value: 'created_at' },
        { key: 'updated_at', text: 'Updated Date', value: 'updated_at' },
      ],
      selectedType: 'updated_at',
      dateRange: '',
      startDate: '',
      endDate: '',
    };
  }

  onSearchChange = e => {
    const input = e.target.value.toLowerCase();
    this.setState({
      inputValue: input,
    });
  };

  onSelectChange = (e, { name, value }) => {
    this.setState({
      selectedType: value,
    });
  };

  onDatePickerChange = (event, { name, value }) => {
    this.setState({
      dateRange: value,
      startDate: value.split(' - ')[0],
      endDate: value.split(' - ')[1],
    });
    const { startDate, endDate } = this.state;
    if (startDate && endDate) {
      this.filterData();
    }
  };

  filterData = () => {
    const { dataSource } = this.props;
    const { inputValue, startDate, endDate, selectedType } = this.state;
    return dataSource.filter(
      data =>
        (!inputValue ||
          data.name.toLowerCase().includes(inputValue.toLowerCase())) &&
        ((!startDate && !endDate) ||
          isBetween(data[selectedType].split('T')[0], startDate, endDate)),
    );
  };

  handleClearChange = () => {
    this.setState({
      inputValue: '',
      dateRange: '',
      startDate: '',
      endDate: '',
    });
  };

  handleSort = clickedColumn => () => {
    const { transformDataSource, dataSource } = this.props;
    const { column, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: 'ascending',
      });
      transformDataSource(_.sortBy(dataSource, [clickedColumn]));
      return;
    }

    this.setState({
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    });

    transformDataSource(dataSource.reverse());
  };

  render() {
    const {
      column,
      direction,
      dateType,
      dateRange,
      selectedType,
      inputValue,
    } = this.state;
    const styles = {
      table: {
        width: '98%',
        margin: '0 auto',
        textAlign: 'center',
        boxShadow: '0 1px 20px -8px rgba(0,0,0,.5)',
      },
      link: {
        color: '#fff',
      },
      noDemo: {
        cursor: 'not-allowed',
      },
      form: {
        marginLeft: '1%',
        marginRight: '1%',
        marginBottom: '1%',
      },
      input: {
        width: '400px',
      },
      select: {
        width: '200px',
      },
      datePicker: {
        width: '300px',
      },
      btn: {
        position: 'relative',
        top: '24px',
      },
    };
    return (
      <>
        <Form style={styles.form}>
          <Form.Group>
            <Form.Field
              control={Input}
              style={styles.input}
              label='Name'
              icon='search'
              iconPosition='left'
              placeholder='Search...'
              value={inputValue}
              onChange={e => this.onSearchChange(e)}
            />
            <Form.Field
              control={Select}
              style={styles.select}
              label='Date Type'
              value={selectedType}
              options={dateType}
              placeholder='Choose Date Type...'
              onChange={this.onSelectChange}
            />
            <Form.Field
              control={DatesRangeInput}
              style={styles.datePicker}
              label='Date Range'
              name='dateRange'
              placeholder='From - To'
              value={dateRange}
              clearable
              clearIcon={<Icon name='remove' color='red' />}
              iconPosition='left'
              dateFormat='YYYY-MM-DD'
              onChange={this.onDatePickerChange}
            />
            <Form.Field
              control={Button}
              style={styles.btn}
              onClick={this.handleClearChange}
            >
              Clear
            </Form.Field>
          </Form.Group>
        </Form>
        <Table celled selectable style={styles.table} inverted sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === 'name' ? direction : null}
                onClick={this.handleSort('name')}
              >
                <Icon name='briefcase' />
                Name
              </Table.HeaderCell>
              <Table.HeaderCell collapsing width={4}>
                <Icon name='info' />
                Introduction
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'created_at' ? direction : null}
                onClick={this.handleSort('created_at')}
              >
                <Icon name='clock' />
                Created Date
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'updated_at' ? direction : null}
                onClick={this.handleSort('updated_at')}
              >
                <Icon name='arrow circle up' />
                Updated Date
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Icon name='linkify' />
                Link
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'size' ? direction : null}
                onClick={this.handleSort('size')}
              >
                <Icon name='database' />
                Size
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'stargazers_count' ? direction : null}
                onClick={this.handleSort('stargazers_count')}
              >
                <Icon name='star' />
                Stargazers Count
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'forks_count' ? direction : null}
                onClick={this.handleSort('forks_count')}
              >
                <Icon name='fork' />
                Forks Count
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === 'fork' ? direction : null}
                onClick={this.handleSort('fork')}
              >
                <Icon name='cloud download' />
                Is Fork ?
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.filterData().map((value, key) => (
              <Table.Row key={key}>
                <Table.Cell
                  style={{
                    textAlign: 'left',
                  }}
                >
                  {value.name}
                </Table.Cell>
                <Table.Cell
                  style={{
                    textAlign: 'left',
                  }}
                >
                  {value.description}
                </Table.Cell>
                <Table.Cell> {formatJSONDate(value.created_at)} </Table.Cell>
                <Table.Cell> {formatJSONDate(value.updated_at)} </Table.Cell>
                <Table.Cell>
                  <Button.Group style={!value.homepage ? styles.noDemo : null}>
                    <Button primary>
                      <a
                        href={value.html_url}
                        style={styles.link}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        GitHub
                      </a>
                    </Button>
                    <Button.Or />
                    <Button positive disabled={!value.homepage}>
                      <a
                        href={value.homepage}
                        style={styles.link}
                        target='_blank'
                        rel='noopener noreferrer'
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
