import React, { Component } from 'react';
import api from './http/api';
import GitHubLogo from './components/githubLogo/GitHubLogo';
import Content from './components/content/Content';
import Footer from './components/footer/Footer';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      loading: false,
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.getBlogRepo();
  }

  componentWillUnmount() {}

  getBlogRepo = async () => {
    this.setState({
      loading: true,
    });
    try {
      const res = await api.blogRepo();
      this.setState(
        {
          dataSource: [...res.data],
        },
        () => {
          this.getUserRepo();
        },
      );
    } catch (e) {
      alert('server error');
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
  getUserRepo = async () => {
    const { dataSource } = this.state;
    try {
      const res = await api.userRepo();
      this.setState({
        dataSource: [...dataSource, ...res.data],
      });
    } catch (e) {
      alert('server error');
    }
  };

  transformDataSource = dataSource => {
    this.setState({
      dataSource,
    });
  };

  render() {
    const { dataSource, loading } = this.state;
    return (
      <div className='App'>
        <header>
          <GitHubLogo />
          <h1 className='title'> Open Sources of Yancey </h1>{' '}
        </header>{' '}
        <Content
          dataSource={dataSource}
          loading={loading}
          transformDataSource={dataSource =>
            this.transformDataSource(dataSource)
          }
        />{' '}
        <Footer />
      </div>
    );
  }
}

export default App;
