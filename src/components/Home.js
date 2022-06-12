import React, { Component } from "react";
import { connect } from "react-redux";
import '../assets/css/ruang-admin.min.css';
import '../assets/css/bootstrap.min.css';
import { logoutUser } from "../actions/auth";
import firebase from '../firebase/firebase';
import { Link } from 'react-router-dom';

class Home extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser()); 
  };
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('articles');
    this.unsubscribe = null;
    this.state = {
      articles: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const articles = [];
    querySnapshot.forEach((doc) => {
      const { title, body, author } = doc.data();
      articles.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        body,
        author,
      });
    });
    this.setState({
      articles
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  render() {
    const { title, body, author } = this.state;
    const { isLoggingOut, logoutError } = this.props; return (
      <div>
        <Link to='/create'><button type="submit" class="btn btn-primary mb-2" >Create</button>
                    </Link><br/>
                    
                            <button onClick={this.handleLogout}>Logout</button>

        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
        
        <div class="row">
          <div class="col-lg-12">
            <div class="card mb-4">
              <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold text-primary">List Mahasiswa</h6>
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
                  {this.state.articles.map(article =>
                  <tr>
                    <td>{article.body}</td>
                    <td>{article.author}</td>
                    <td><Link to={`/show/${article.key}`}>{article.title}</Link></td>
                  </tr>
                )}
                  </tbody>

                </table>
                <br></br>

              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
} function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    logoutError: state.auth.logoutError
  };
}
export default connect(mapStateToProps)(Home);