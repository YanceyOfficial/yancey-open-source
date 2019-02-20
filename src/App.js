import React, { Component } from 'react';
import api from './http/api';
import GitHubLogo from './components/githubLogo/GitHubLogo';
import Content from './components/content/Content';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogData: [],
      userData: [],
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    Promise.all([this.getBlogRepo(), this.getUserRepo()]);
  }

  componentWillUnmount() {
  }

  getBlogRepo = async () => {
    try {
      const res = await api.blogRepo();
      this.setState({
        blogData: res.data,
      });
    } catch (e) {
      console.log('unknown error');
    }
  };
  getUserRepo = async () => {
    try {
      const res = await api.userRepo();
      this.setState({
        userData: res.data,
      })
    } catch (e) {
      console.log('unknown error');
    }
  };

  render() {
    const {blogData, userData} = this.state;
    return (
      <div className="App">
        <GitHubLogo/>
        <h1 className="title">GitHub Repositories for Yancey</h1>
        <Content blogData={blogData} userData={userData}/>
        <footer className="copyright">
          <a href="https://www.yanceyleo.com" target="_blank" rel="noopener noreferrer">
            Copyright &copy;
            {' '}
            {new Date().getFullYear()}
            {' '}
            Yancey Inc. All rights reserved.
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
