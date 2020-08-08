import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import App from '/imports/ui/App';

import Modal from 'react-modal';
Modal.setAppElement(document.getElementById('react-target'));

import '../imports/startup/simple-schema-configuration';
import { Session } from 'meteor/session';

// Stateless function component

Meteor.startup(() => {
  Session.set('showVisible', true);
  render(<App />, document.getElementById('react-target'));
});
