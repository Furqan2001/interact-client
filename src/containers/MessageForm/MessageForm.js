import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from '../../store/actions/messages'

class MessageForm extends Component {

  state= {
    message: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.postNewMessage(this.state.message);
    this.props.history.push("/");
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}
        <textarea 
          type="text"
          className="form-control"
          value={this.state.message}
          rows="4"
          onChange={e => this.setState({ message: e.target.value })}
        ></textarea>
        <button type="submit" className="btn btn-success pull-right">
          Add New Message
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return  {
    errors: state.errors
  }
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm)