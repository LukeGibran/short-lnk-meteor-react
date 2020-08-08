import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import LinksList from './LinksList';
import LinksListFilter from './LinksListFilter';

import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

import PropTypes from 'prop-types';

export default class Link extends Component {
  render() {
    Tracker.autorun(() => {
      const isAuthenticated = !!Meteor.userId();

      if (!isAuthenticated) {
        this.props.history.push('/');
      }
    });
    return (
      <div>
        <PrivateHeader title="Your links" />
        <div className="page-content">
          <LinksListFilter />
          <AddLink />
          <LinksList />
        </div>
      </div>
    );
  }
}

Link.propTypes = {
  history: PropTypes.object.isRequired,
};
