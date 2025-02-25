import React, { Component } from 'react'
import { userRepo, blogRepo, hyperChatRepo, yanceyLearningTechRepo } from '../services'
import GitHubLogo from '../components/GitHubLogo'
import Content from '../components/Content'
import Footer from '../components/Footer'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      loading: false,
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0)
  }

  componentDidMount() {
    this.fetchData()
  }

  async fetchData() {
    this.setState({
      loading: true,
    })

    try {
      const res = await Promise.all([
        fetch(userRepo),
        fetch(blogRepo),
        fetch(yanceyLearningTechRepo),
        fetch(hyperChatRepo),
      ])

      const data = await Promise.all(
        res.map(function (data) {
          return data.json()
        }),
      )

      this.setState({
        dataSource: data.flat(),
      })
    } catch (e) {
      alert('[Server Error] ' + e.message)
    } finally {
      this.setState({
        loading: false,
      })
    }
  }

  transformDataSource = (dataSource) => {
    this.setState({
      dataSource,
    })
  }

  render() {
    const { dataSource, loading } = this.state
    return (
      <div className="App">
        <header>
          <GitHubLogo />
          <h1 className="title">Yancey Open Source</h1>
        </header>
        <Content
          dataSource={dataSource}
          loading={loading}
          transformDataSource={(dataSource) => this.transformDataSource(dataSource)}
        />
        <Footer />
      </div>
    )
  }
}

export default App
