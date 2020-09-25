import React, { Component } from 'react'

class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const styles = {
      textAlign: 'center',
      marginTop: '16px',
      paddingBottom: '16px',
      fontSize: '16px',
    }
    return (
      <footer style={styles}>
        <a href="https://www.yanceyleo.com" target="_blank" rel="noopener noreferrer">
          Copyright &copy; {new Date().getFullYear()} Yancey Inc. and its affiliates.
        </a>
      </footer>
    )
  }
}

export default Footer
