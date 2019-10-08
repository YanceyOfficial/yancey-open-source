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
      loading: 0,
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    this.getBlogRepo();
    this.getUserRepo();
    this.getLearnRepo();
    this.getSourceCodeRepo();
  }

  getBlogRepo = async () => {
    this.setState({
      loading: true,
    });
    try {
      const res = await api.blogRepo();
      this.setState({
        dataSource: [...this.state.dataSource, ...res.data],
      });
    } catch (e) {
      alert('server error');
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  getUserRepo = async () => {
    this.setState({
      loading: true,
    });
    try {
      const res = await api.userRepo();
      this.setState({
        dataSource: [...this.state.dataSource, ...res.data],
      });
    } catch (e) {
      alert('server error');
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  getLearnRepo = async () => {
    this.setState({
      loading: true,
    });
    try {
      const res = await api.learnRepo();
      this.setState({
        dataSource: [...this.state.dataSource, ...res.data],
      });
    } catch (e) {
      alert('server error');
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  getSourceCodeRepo = async () => {
    this.setState({
      loading: true,
    });
    try {
      const res = await api.sourceCodeRepo();
      this.setState({
        dataSource: [...this.state.dataSource, ...res.data],
      });
    } catch (e) {
      alert('server error');
    } finally {
      this.setState({
        loading: false,
      });
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
          <h1 className='title'> Open Sources of Yancey </h1>
        </header>
        <Content
          dataSource={dataSource}
          loading={!!loading}
          transformDataSource={dataSource =>
            this.transformDataSource(dataSource)
          }
        />
        <Footer />
      </div>
    );
  }
}

export default App;
