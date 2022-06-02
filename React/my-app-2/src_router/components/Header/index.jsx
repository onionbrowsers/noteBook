import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Header extends Component {
    back() {
        console.log(withRouter, '--')
    }
    render() {
        console.log(this.props)
        return (
            <div className="page-header">
                <h2>React Router Demo</h2>
                {this.props.children}

                <button onClick={this.back.bind(this)}>回退</button>
            </div>
        )
    }
}

export default withRouter(Header)
