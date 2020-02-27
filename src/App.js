import React from 'react';

import { Grid } from '@material-ui/core';
import { SearchBar, VideoDetail } from './components';
import youtube from './api/youtube';
// import VideoDetail from './components/VideoDetail';

// import youtube from './api/youtube'

const Api_Key = process.env.REACT_APP_API_KEY;

class App extends React.Component {
  state = {
    videos: [],
    selectedVideo: null,
  }

  handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: Api_Key,
        q: searchTerm,
      }
    });

    // console.log(response.data)

    this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
  }

  render(){
    const { selectedVideo } = this.state;

    return(
      <Grid justify="center" container spacing={10}>
        <Grid item xs={12}>
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <SearchBar onFormSubmit={this.handleSubmit} />
            </Grid>
            <Grid item xs={8}>
              <VideoDetail video={selectedVideo} />
            </Grid>
            <Grid item xs={4}>
              {/* Video List */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default App;
