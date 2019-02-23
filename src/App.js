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
      dataSource: []
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
    try {
      const res = await api.blogRepo();
      this.setState(
        {
          dataSource: [...res.data]
        },
        () => {
          this.getUserRepo();
        }
      );
    } catch (e) {
      alert('server error');
    }
  };
  getUserRepo = async () => {
    const { dataSource } = this.state;
    console.log(dataSource);
    try {
      const res = await api.userRepo();
      this.setState({
        dataSource: [...dataSource, ...res.data]
      });
    } catch (e) {
      alert('server error');
    }
  };

  transformDataSource = dataSource => {
    this.setState({
      dataSource
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className="App">
        <GitHubLogo />
        <h1 className="title">GitHub Repositories of Yancey</h1>
        <Content
          dataSource={dataSource}
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
