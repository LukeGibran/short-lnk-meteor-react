import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import Modal from 'react-modal';

export default class AddLink extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '',
      isOpen: false,
      error: '',
    };
  }

  onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

    if (url) {
      Meteor.call('links.insert', url, (err) => {
        if (!err) {
          this.handleModalClose();
        } else {
          this.setState({ error: err.reason });
        }
      });
    }
  }

  onChange(e) {
    this.setState({
      url: e.target.value.trim(),
    });
  }

  handleModalClose() {
    this.setState({ isOpen: false, url: '', error: '' });
  }

  render() {
    return (
      <>
        <button
          className="button"
          onClick={() => this.setState({ isOpen: true })}
        >
          + Add Link
        </button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={() => this.handleModalClose()}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>

          {this.state.error ? <p>{this.state.error}</p> : null}
          <form
            className="boxed-view__form"
            onSubmit={this.onSubmit.bind(this)}
          >
            <input
              type="text"
              value={this.state.url}
              name=""
              placeholder="url"
              id=""
              onChange={this.onChange.bind(this)}
              ref="url"
            />
            <button className="button">Add Link</button>
            <button
              type="button "
              className="button button--secondary"
              onClick={() => this.handleModalClose()}
            >
              Close
            </button>
          </form>
        </Modal>
      </>
    );
  }
}
