import React, { Component } from "react"
import axios from "axios"

export default class EditClient extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      idUser: "",
      exercises: []
    }
  }

  componentDidMount() {
    axios
      .get("/api/clients/" + this.props.match.params.id)
      .then(res => {
        console.log(res)
        this.setState({
          name: res.data.name,
          idUser: res.data.idUser
        })
      })
      .catch(err => console.log(err))

    //change the name of client on exercises
    axios
      .get("/api/exercises")
      .then(res => {
        this.setState({
          exercises: res.data
        })
      })
      .catch(err => console.log(err))
  }

  onChangeName = e => {
    this.setState({
      name: e.target.value
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const client = {
      name: this.state.name,
      idUser: this.state.idUser
    }
    axios
      .put("/api/clients/update/" + this.props.match.params.id, client)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

    // Change all exercises usernames
    console.log(this.state.exercises)
    this.state.exercises.forEach(ex => {
      if (ex.idClient === this.props.match.params.id) {
        const exercise = {
          username: this.state.name,
          description: ex.description,
          duration: ex.duration,
          date: ex.date,
          idClient: ex.idClient,
          idUser: ex.idUser
        }
        axios
          .put("/api/exercises/update/" + ex._id, exercise)
          .then(res => console.log(res))
          .catch(err => console.log(err))
      }
    })

    window.location = "/clients"
  }
  render() {
    return (
      <div>
        <h3>Edit Client</h3>
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
              value="Edit Client"
              className="btn btn-secondary"
            />
          </div>
        </form>
      </div>
    )
  }
}
