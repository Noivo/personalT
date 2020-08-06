import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const Client = (props) => (
  <tr>
    <td>{props.clients.name}</td>
    <td>
      <Link to={"/clients/edit/" + props.clients._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteClient(props.clients._id)
          props.deleteExercises(props.clients._id)
        }}
      >
        delete
      </a>
    </td>
  </tr>
)

class ClientList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clients: [],
      exercises: [],
      loading: true,
    }
  }

  componentDidMount() {
    const { user } = this.props.auth
    axios
      .get("/api/clients/")
      .then((response) => response.data)
      .then((data) => data.filter((client) => client.idUser === user.id))
      .then((clients) => {
        this.setState({
          clients: clients,
          loading: false,
        })
      })
      .catch((error) => {
        console.log(error)
      })

    axios
      .get("/api/exercises/")
      .then((response) => {
        this.setState({
          exercises: response.data,
        })
      })
      .catch((error) => console.log(error))
  }

  deleteClient = (id) => {
    axios.delete("/api/clients/" + id).catch((err) => console.log(err))

    this.setState({
      clients: this.state.clients.filter((el) => el._id !== id),
    })
  }

  // Recive id from user and delete any exercise related with him
  deleteExercises = (id) => {
    this.state.exercises.map((ex) => {
      return (
        ex.idUser === id &&
        axios
          .delete("/api/exercises/" + ex._id)
          .catch((error) => console.log(error))
      )
    })
  }

  clientList = () => {
    return this.state.clients.map((client) => {
      return (
        <Client
          clients={client}
          deleteClient={this.deleteClient}
          deleteExercises={this.deleteExercises}
          key={client._id}
        />
      )
    })
  }

  goCreateClient = () => {
    window.location = "/clients/create"
  }

  printMenu = () => {
    if (!this.state.loading) {
      let clientsExist = this.state.clients && this.state.clients.length
      return clientsExist ? (
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.clientList()}</tbody>
        </table>
      ) : (
        <h3>No Clients available, please create a new client!</h3>
      )
    }
  }

  render() {
    return (
      <div>
        <h3>Clients</h3>
        {this.printMenu()}
        <div>
          <input
            className="btn btn-secondary"
            value="Add New Client"
            type="submit"
            onClick={this.goCreateClient}
          />
        </div>
      </div>
    )
  }
}

ClientList.propTypes = {
  auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(ClientList)
