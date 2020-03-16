import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <Link to={"exercises/edit/" + props.exercise._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id)
        }}
      >
        delete
      </a>
    </td>
  </tr>
)

class ExercisesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      exercises: [],
      loading: true
    }
  }

  componentDidMount() {
    const { user } = this.props.auth
    axios
      .get("/api/exercises/")
      .then(response => response.data)
      .then(data => data.filter(exercise => exercise.idUser === user.id))
      .then(exercises => {
        this.setState({
          exercises: exercises,
          loading: false
        })
      })
      .catch(error => {
        console.log(error)
      })
  }
  deleteExercise = id => {
    axios
      .delete("/api/exercises/" + id)
      .then(res => console.log(res))
      .catch(er => console.log(er))

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }
  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      )
    })
  }

  goCreateExer = () => {
    window.location = "/exercises/create"
  }

  printMenu = () => {
    if (!this.state.loading) {
      let exercisesExist = this.state.exercises && this.state.exercises.length
      return exercisesExist ? (
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      ) : (
        <h3>No exercises available, please create a new exercise!</h3>
      )
    }
  }

  render() {
    return (
      <div>
        <h3>Exercises</h3>
        {this.printMenu()}
        <div>
          <input
            type="submit"
            className="btn btn-secondary"
            value="Add New Exercise"
            onClick={this.goCreateExer}
          />
        </div>
      </div>
    )
  }
}

ExercisesList.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(ExercisesList)
