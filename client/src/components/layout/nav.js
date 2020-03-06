import React, { Component } from "react"

class Nav extends Component {
  render() {
    return (
      <nav className="z-depth-0">
        <div className="nav-wrapper white">
          <h3
            style={{
              fontFamily: "monospace"
            }}
            className="col s5 center black-text"
          >
            Personal Trainer
          </h3>
        </div>
      </nav>
    )
  }
}
export default Nav
