import React from 'react';
import {Link} from 'react-router-dom';

const Track = ({track}) => {
  return (
    <div className="col-md-6">
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5>{track.artist_name}</h5>
          <p className="card-text">
            <strong><i className="fas fa-play"></i> Track: </strong> {track.track_name}
            <br/>
            <strong><i className="fas fa-compact-disc"></i> Album: </strong> {track.album_name}
            <br/>
            <strong><i className="fas fa-check"></i> Restrictions: </strong> {track.explicit === 1 ? <span style={{color:'red'}}>Explicit</span> : 'All Ages' }
          </p>
          <Link to={`/lyrics/track/${track.track_id}`} className="btn btn-primary btn-block"><i className="fas fa-chevron-right"></i> View Lyrics</Link>
        </div>
      </div>
    </div>
  )
}

export default Track;