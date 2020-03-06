import React, { Component } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { logoutUser } from "../actions/authActions"
import styled from "styled-components"

const ButtonLog = styled.button`
  display: inline-block;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1em;
  background: #343a40 !important;
  border: none;
  margin-bottom: 0.15em;
  line-height: normal;

  :hover {
    color: white;
  }
`

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault()
    this.props.logoutUser()
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/home" className="navbar-brand">
          Home
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/exercises" className="nav-link">
                Exercises
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/exercises/create" className="nav-link">
                Create Exercise
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/clients" className="nav-link">
                Clients
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/clients/create" className="nav-link">
                Create Client
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item">
              <ButtonLog onClick={this.onLogoutClick}>Logout</ButtonLog>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logoutUser })(Navbar)
