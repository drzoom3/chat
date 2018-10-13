import React from 'react'

import './styles.styl'

export default class NotFound extends React.Component {
  constructor(props) {
      super(props);
      this.state = {}
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className='page page--error'>
        <div className='container'>
          Error
        </div>
      </div>
    )
  }
}