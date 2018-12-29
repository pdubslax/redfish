import {connect} from 'react-redux'
import React, { Component } from 'react';
import {snippets} from '../actions/snippets'
import {user} from '../actions/restAuth'
import {withRouter} from 'react-router'

import AutoRouter from './AutoRouterContainer'
import Navigation from './NavigationContainer'



class General extends Component {
  render() {
    return (
      <div>
        <p>auth: {((this.props.isAuth) ? 'true' : 'false')}</p>
        <p>token: {this.props.token}</p>
        <Navigation />
        <AutoRouter />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.restAuth.isAuth,
    token: localStorage.getItem('token'),
    snippets: state.snippets.snippets,
    users: state.snippets.users,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    putSnippets: (payload) => dispatch(snippets(payload)),
    getUser: (payload) => dispatch(user(payload)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(General))

