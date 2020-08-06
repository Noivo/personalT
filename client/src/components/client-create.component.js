import React, { Component } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import { connect } from "react-redux"

class CreateClient extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      idUser: "",
    }
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { user } = this.props.auth
    const client = {
      name: this.state.name,
      idUser: user.id,
    }
    axios.post("/api/clients/add", client).catch((err) => console.log(err))

    window.location = "/clients"
  }

  render() {
    return (
      <div>
        <h3>Create New Client</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Client"
              className="btn btn-secondary"
            />
          </div>
        </form>
      </div>
    )
  }
}

CreateClient.propTypes = {
  auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(CreateClient)
