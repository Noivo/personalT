import React from "react"
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import jwt_decode from "jwt-decode"
import setAuthToken from "./utils/setAuthToken"
import { setCurrentUser, logoutUser } from "./actions/authActions"

import Navbar from "./components/navbar.component"
import ExerciseList from "./components/exercises-list.component"
import EditExercise from "./components/exercise-edit.component"
import CreateExercise from "./components/exercise-create.component"
import CreateClient from "./components/client-create.component"
import ClientList from "./components/client-list.component"
import EditClient from "./components/client-edit.component"
import HomePage from "./components/home-page.component"

import { Provider } from "react-redux"
import store from "./store"
import Nav from "./components/layout/nav"
import Register from "./components/auth/Register"
import Login from "./components/auth/Login"
import PrivateRoute from "./components/private-route/PrivateRoute"

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  // Decode token and get user info and exp
  const decoded = jwt_decode(token)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  // Check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    // Redirect to login
    window.location.href = "./"
  }
}

const Main = withRouter(({ location }) => {
  return (
    <div className="container">
      <div className="App">
        {location.pathname !== "/register" && location.pathname !== "/" ? (
          <Navbar />
        ) : (
          <Nav />
        )}
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/home" component={HomePage} />
        <PrivateRoute exact path="/exercises" component={ExerciseList} />
        <PrivateRoute
          exact
          path="/exercises/edit/:id"
          component={EditExercise}
        />
        <PrivateRoute exact path="/clients/edit/:id" component={EditClient} />
        <PrivateRoute
          exact
          path="/exercises/create"
          component={CreateExercise}
        />
        <PrivateRoute exact path="/clients/create" component={CreateClient} />
        <PrivateRoute exact path="/clients" component={ClientList} />
      </div>
    </div>
  )
})
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Main />
      </Router>
    </Provider>
  )
}

export default App
