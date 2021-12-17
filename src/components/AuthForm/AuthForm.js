import React, { Component } from 'react';

class AuthForm extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    profileImageUrl: ""
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state)
    let userData = null;
    const actionType = this.props.signUp ? "signup" : "signin";
    if (this.props.signUp) {
      userData = new FormData();
      for(let key in this.state) {
        userData.append(key, this.state[key]);
      }
    }
    this.props.onAuth(actionType, userData? userData : this.state)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(err => {
        return;
      })
  }
  onImageChange = async event => {
    if (event.target.files && event.target.files[0]) {
      let files = event.target.files;
      this.setState({ profileImageUrl: files[0] }, () => {});
    }
  };

  render() {
    const { email, username, password } = this.state;
    const { buttonText, heading, signUp, errors, history, removeError } = this.props;
    history.listen(() => {
      removeError();
      this.setState({
        email: "",
        username: "",
        password: "",
        profileImageUrl: ""
      });
    });
    return(
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <h2>{heading}</h2>
                {errors.message && <div className="alert alert-danger">{errors.message}</div>}
                <label htmlFor="email">Email:</label>
                <input 
                  className="form-control"
                  type="text"
                  id="email"
                  value={email}
                  onChange = {this.handleChange}
                  name="email"
                />
                <label htmlFor="password">Password:</label>
                <input 
                  className="form-control"
                  type="password"
                  id="password"
                  value={password}
                  onChange = {this.handleChange}
                  name="password"
                />
                {signUp && (
                  <div>
                    <label htmlFor="username">Username:</label>
                    <input 
                      className="form-control"
                      type="text"
                      id="username"
                      value={username}
                      onChange = {this.handleChange}
                      name="username"
                    />
                    <label htmlFor="imageUrl">Image:</label>
                    <input 
                      style={{paddingBottom: '36px'}}
                      className="form-control"
                      type="file"
                      id="imageUrl"
                      accept="image/*"
                      onChange = {this.onImageChange}
                      name="profileImageUrl"
                    />
                  </div>
                )}
                <button className="btn btn-primary btn-lg btn-block">
                  {buttonText}
                </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;