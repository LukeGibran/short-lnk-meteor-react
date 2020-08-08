import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import { Accounts } from 'meteor/accounts-base';

import { Tracker } from 'meteor/tracker';

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({
        error: 'Password must be more that 8 characters long',
      });
    }

    Accounts.createUser({ email, password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
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
      <Fragment>
        <div className="boxed-view">
          <div className="boxed-view__box">
            <p>Join Short Lnk</p>
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
              <button className="button">Create Account</button>
            </form>
            <NavLink to="/">Already have an account?</NavLink>
          </div>
        </div>
      </Fragment>
    );
  }
}
