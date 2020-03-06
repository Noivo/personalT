import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import dumbbells from "../images/dumbbells.jpg" // Tell webpack this JS file uses this image
import styled from "styled-components"

const Thing = styled.h3`
  color: whitesmoke;
  background-color: dimgray;
  text-align: center;
  font-weight: bold;
  border: 2px solid black;
  border-radius: 3px;
  font-family: serif;
  &:hover {
    color: antiquewhite;
    font-size: 50px;
  }
`
class HomePage extends Component {
  render() {
    const { user } = this.props.auth
    return (
      <div>
        <Thing>
          <span role="img" aria-label="Weight">
            🏋
          </span>{" "}
          Welcome {user.name}{" "}
          <span role="img" aria-label="Weight">
            🏋
          </span>
        </Thing>
        <img src={dumbbells} alt="Gym Weights" height="100%" width="100%" />
        
      </div>
    )
  }
}

HomePage.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps)(HomePage)
