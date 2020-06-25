import React, { Component, Fragment } from 'react';
import {Consumer} from '../../context';
import Spinner from '../layout/Spinner';
import Track from './Track';

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const {track_list, heading} = value;
          return (track_list === undefined || track_list.length === 0 ? <Spinner /> :
            <Fragment>
              <h2 className="text-center mb-5">{heading}</h2>
              <div className="row">
                {track_list.map(item => (
                  <Track track={item.track} key={item.track.track_id} />
                ))}
              </div> 
            </Fragment>
          )
        }}
      </Consumer>
    )
  }
}

export default Tracks;