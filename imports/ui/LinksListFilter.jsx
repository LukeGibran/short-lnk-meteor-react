import React, { Component } from 'react';

import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

class LinksListFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showVisible: false,
    };
  }

  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      const showVisible = Session.get('showVisible');

      this.setState({ showVisible });
    });
  }

  componentWillUnmount() {
    this.tracker.stop();
  }
  render() {
    return (
      <div>
        <label className="checkbox">
          <input
            className="checkbox__box"
            type="checkbox"
            checked={!this.state.showVisible}
            onChange={(e) => {
              Session.set('showVisible', !e.target.checked);
            }}
          />
          show hidden links
        </label>
      </div>
    );
  }
}

export default LinksListFilter;
