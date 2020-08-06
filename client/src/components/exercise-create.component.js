import React, { Component } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"
import PropTypes from "prop-types"
import { connect } from "react-redux"

class CreateExercise extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      idClient: "",
      infoClients: [],
      clientsName: [],
      idUser: "",
    }
  }

  componentDidMount() {
    const { user } = this.props.auth
    axios
      .get("/api/clients/")
      .then((response) => response.data)
      .then((data) => data.filter((clients) => clients.idUser === user.id))
      .then((clients) => {
        if (clients[0] !== undefined) {
          this.setState({
            username: clients[0].username,
            // save the username with ID
            infoClients: clients.map((client) => [client.name, client._id]),
          })
        } else {
          window.location = "/clients/create"
        }
      })
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    })
  }
  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    })
  }
  onChangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    })
  }
  onChangeDate = (date) => {
    this.setState({
      date: date,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { user } = this.props.auth
    const exercise = {
      // Needed to check, because selector dont recognize first option if you don't change
      username: this.state.username
        ? this.state.username
        : this.state.infoClients[0][0],
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      // search for the ID with the username, same problem with selector
      idClient: this.state.infoClients.includes(
        (a) => a[0] === this.state.username
      )
        ? this.state.infoClients.find((a) => a[0] === this.state.username)[1]
        : this.state.infoClients[0][1],
      idUser: user.id,
    }

    axios.post("/api/exercises/add", exercise).catch((err) => console.log(err))
    window.location = "/exercises"
  }

  goCreateClient = () => {
    window.location = "/clients/create"
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.infoClients.map((client) => {
                return (
                  <option key={client[1]} value={client[0]}>
                    {client[0]}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise"
              className="btn btn-secondary"
            />
          </div>
        </form>
      </div>
    )
  }
}

CreateExercise.propTypes = {
  auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(CreateExercise)
