import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { error: '' };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        this.setState({ error: 'Unable to login. Check email and password' });
      } else {
        this.setState({ error: '' });
      }
    });
  }

  render() {
    Tracker.autorun(() => {
      if (Meteor.userId()) {
        this.props.history.push('/link');
      }
    });
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Short Lnk</h1>
          {this.state.error ? <p> {this.state.error}</p> : undefined}
          <form
            onSubmit={this.onSubmit.bind(this)}
            noValidate
            className="boxed-view__form"
          >
            <input
              type="email"
              ref="email"
              name="email"
              placeholder="email"
              id=""
            />

            <input
              type="password"
              ref="password"
              name="password"
              id=""
              placeholder="password"
            />
            <button className="button">Login</button>
          </form>
          <NavLink to="/signup">Signup</NavLink>
        </div>
      </div>
    );
  }
}
