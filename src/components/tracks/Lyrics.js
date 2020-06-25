import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  }

  componentDidMount(){
    axios.get(`${process.env.REACT_APP_CORS_ANYWHERE}${process.env.REACT_APP_MM_CORE}/track.lyrics.get?track_id=${this.props.match.params.track_id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        console.log(res.data.message.body.lyrics);
        this.setState({lyrics: res.data.message.body.lyrics});
      })
      .catch(err => console.error(err));
    axios.get(`${process.env.REACT_APP_CORS_ANYWHERE}${process.env.REACT_APP_MM_CORE}/track.get?track_id=${this.props.match.params.track_id}&apikey=${process.env.REACT_APP_MM_KEY}`)
    .then(res => {
      console.log(res.data.message.body.track);
      this.setState({track: res.data.message.body.track});
    })
    .catch(err => console.error(err));
  }
  
  render() {
    const {track, lyrics} = this.state
    
    return (track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0 ? <Spinner /> : 
      <Fragment>
        <Link to="/" className="btn btn-warning mb-4 btn-md">Go Back</Link>
        <div className="card shadow-lg shadow-danger p-3">
          <div className="card-header mb-3">
            <h2 className="text-primary">{track.track_name}</h2> <h5 className="text-secondary">By {track.artist_name}</h5>
          </div>
          <div className="card-body">
            <p className="card-text">{lyrics.lyrics_body} </p>
          </div>
        </div>

        <ul className="list-group mt-3">
          <li className="list-group-item"><strong>Album Name: </strong> {track.album_name} </li>
          <li className="list-group-item"><strong>Album ID: </strong> {track.album_id} </li>
          <li className="list-group-item"><strong>Rating: </strong> {track.explicit === 1 ? <span style={{color:'red'}}>Explicit</span> : 'All Audiences'}</li>
          <li className="list-group-item"><strong>Release Date: </strong> <Moment format="MM/DD/YYYY">{track.updated_time}</Moment></li>
        </ul>
      </Fragment>
    )
  }
}

export default Lyrics;