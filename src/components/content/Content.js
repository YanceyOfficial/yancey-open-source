import React, {
  Component
} from 'react';
import { Icon, Button, Table } from 'semantic-ui-react';
import { formatJSONDate } from "../../tools/tools";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    const {blogData, userData} = this.props;
    const styles = {
      table: {
        width: '98%',
        margin: '0 auto',
        textAlign: 'center',
        boxShadow: '0 1px 20px -8px rgba(0,0,0,.5)',
      },
      link: {
        color: '#fff'
      }
    };
    return (
      <Table celled selectable style={styles.table} inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell><Icon name='file'/>Name</Table.HeaderCell>
            <Table.HeaderCell collapsing width={5}><Icon name='info'/>Intro</Table.HeaderCell>
            <Table.HeaderCell><Icon name='clock'/>Created Date</Table.HeaderCell>
            <Table.HeaderCell><Icon name='linkify'/>Link</Table.HeaderCell>
            <Table.HeaderCell><Icon name='star'/>Stargazers Count</Table.HeaderCell>
            <Table.HeaderCell><Icon name='fork'/>Forks Count</Table.HeaderCell>
            <Table.HeaderCell><Icon name='cloud download'/>Is Fork?</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            Object.keys(blogData).map(key => (
              <Table.Row
                key={key}
                warning={blogData[key].fork}
              >
                <Table.Cell style={{textAlign: 'left'}}>
                  {blogData[key].name}
                </Table.Cell>
                <Table.Cell style={{textAlign: 'left'}}>
                  {blogData[key].description}
                </Table.Cell>
                <Table.Cell>
                  {formatJSONDate(blogData[key].created_at).split(' ')[0]}
                </Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button
                      primary
                    >
                      <a href={blogData[key].html_url} style={styles.link} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </Button>
                    <Button.Or/>
                    <Button
                      positive
                      disabled={!blogData[key].homepage}
                    >
                      <a href={blogData[key].homepage} style={styles.link} target="_blank"
                         rel="noopener noreferrer">
                        Demo
                      </a>
                    </Button>
                  </Button.Group>
                </Table.Cell>
                <Table.Cell>
                  {blogData[key].stargazers_count}
                </Table.Cell>
                <Table.Cell>
                  {blogData[key].forks_count}
                </Table.Cell>
                <Table.Cell>
                  {blogData[key].fork ? 'Yes' : 'No'}
                </Table.Cell>
              </Table.Row>
            ))
          }
          {
            Object.keys(userData).map(key => (
              <Table.Row
                key={key}
              >
                <Table.Cell style={{textAlign: 'left'}}>
                  {userData[key].name}
                </Table.Cell>
                <Table.Cell style={{textAlign: 'left'}}>
                  {userData[key].description}
                </Table.Cell>
                <Table.Cell>
                  {formatJSONDate(userData[key].created_at).split(' ')[0]}
                </Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button
                      primary
                    >
                      <a href={userData[key].html_url} style={styles.link} target="_blank" rel="noopener noreferrer">
                        GitHub
                      </a>
                    </Button>
                    <Button.Or/>
                    <Button
                      positive
                      disabled={!userData[key].homepage}
                    >
                      <a href={userData[key].homepage} style={styles.link} target="_blank"
                         rel="noopener noreferrer">
                        Demo
                      </a>
                    </Button>
                  </Button.Group>
                </Table.Cell>
                <Table.Cell>
                  {userData[key].stargazers_count}
                </Table.Cell>
                <Table.Cell>
                  {userData[key].forks_count}
                </Table.Cell>
                <Table.Cell>
                  {userData[key].fork ? 'Yes' : 'No'}
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    );
  }
}

export default Content;
