import React, { Component } from "react"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

export default class EditExercise extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      idClient: "",
      users: [],
      infoClients: []
    }
  }

  componentDidMount() {
    console.log("Entrei")
    axios
      .get("/api/exercises/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
          idClient: response.data.idClient,
          idUser: response.data.idUser
        })
      })
      .catch(function(error) {
        console.log(error)
      })

    axios
      .get("/api/clients/")
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            infoClients: response.data.map(client => [client.name, client._id])
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription = e => {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration = e => {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate = date => {
    this.setState({
      date: date
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
      idClient: this.state.infoClients.find(
        a => a[0] === this.state.username
      )[1],
      idUser: this.state.idUser
    }

    axios
      .put("/api/exercises/update/" + this.props.match.params.id, exercise)
      .then(res => console.log(res))
      .catch(err => console.log(err))

    window.location = "/exercises"
  }

  render() {
    return (
      <div>
        <h3>Edit Exercise Log</h3>
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
              {this.state.infoClients.map(client => {
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
              value="Edit Exercise Log"
              className="btn btn-secondary"
            />
          </div>
        </form>
      </div>
    )
  }
}
