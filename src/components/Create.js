import React, { Component } from "react";
import { connect } from "react-redux";
import '../assets/css/ruang-admin.min.css';
import '../assets/css/bootstrap.min.css';
import { logoutUser } from "../actions/auth";
import firebase from '../firebase/firebase';

class Create extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection('articles');
    this.state = {
      title: '',
      body: '',
      author: ''
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { title, body, author } = this.state;

    this.ref.add({
      title,
      body,
      author
    }).then((docRef) => {
      this.setState({
        title: '',
        body: '',
        author: ''
      });
      this.props.history.push("/")
    })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
  render() {
    const { title, body, author } = this.state;
    const { isLoggingOut, logoutError } = this.props; return (
      <div>

        <button onClick={this.handleLogout}>Logout</button>

        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
        (
        <div class="row">
          <div class="col-lg-12">
            <div class="card mb-4">
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">DataTables</h6>
              </div>
              <div class="table-responsive p-3">
                <table class="table align-items-center table-flush" id="dataTable">
                  <thead class="thead-light">
                    <tr>

                      <th>Kelas</th>
                      <th>Nama</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>

                  </tbody>

                </table>
                <br></br>

                <form onSubmit={this.onSubmit}>
                  <div class="form-group">
                    <label for="title">Status:</label>
                    <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Status" />
                  </div>
                  <div class="form-group">
                    <label for="body">Kelas:</label>
                    <textArea class="form-control" name="body" onChange={this.onChange} placeholder="Kelas" cols="80" rows="3">{body}</textArea>
                  </div>
                  <div class="form-group">
                    <label for="author">Nama:</label>
                    <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Nama" />
                  </div>
                  <button type="submit" class="btn btn-success">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
        )
      </div>
    );
  }
} function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default connect(mapStateToProps)(Create);