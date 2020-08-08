import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { Accounts } from 'meteor/accounts-base';

export default class PrivateHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onLogout() {
    Accounts.logout();
  }

  render() {
    return (
      <div className="header">
        <div className="header__content">
          <h1 className="header__title">{this.props.title}</h1>
          <button
            className="button button--link-text"
            onClick={() => this.onLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
