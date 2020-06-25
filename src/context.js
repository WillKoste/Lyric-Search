import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch(action.type){
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results'
      }
    default:
      return state;
  }
}

export class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks',
    dispatch: action => this.setState(state => reducer(state, action))
  }

  componentDidMount(){
    axios.get(`${process.env.REACT_APP_CORS_ANYWHERE}${process.env.REACT_APP_MM_CORE}/chart.tracks.get?page=1&size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        // console.log(res.data.message.body.track_list)
        this.setState({track_list: res.data.message.body.track_list});
      })
      .catch(err => console.error(err));
  }
  
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}

export const Consumer = Context.Consumer;