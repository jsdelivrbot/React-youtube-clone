import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar.js';
import VideoList from './components/video_list.js';
import VideoDetail from './components/video_detail.js';
const API_KEY = 'AIzaSyB1w8V5i_sMmJoP_-IUx9kfzVMZhVx5Hbg';
//import App from './components/app.js';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('Elixir Phoenix');
  }


  videoSearch(searchTerm) {
    YTSearch({key: API_KEY, searchTerm: searchTerm}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    // lodash will make sure this function will only run once per 300mili-secs
    const videoSearch = _.debounce( (searchTerm) => { this.videoSearch(searchTerm) }, 300);
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          // This is the function that gets called 2 child components down in video_list_item
          onVideoSelect={ (selectedVideo) => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(
      <App />, document.querySelector('.container')
);
