
class App extends React.Component{
  constructor(props){
    var blankData = [{
      id: {
        videoId: ''
      },
      snippet: {
        title: '',
        description: '',
        thumbnails: {
          default: {
            url: ''
          }
        }
      }
    }];
    super(props);
    this.state={
      allVideos: blankData,
      currentVideo: blankData[0],
      autoplay : 0
      
    };
    this.handleVideoClick = this.handleVideoClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.bounceSearch = this.debounceHandler(this.handleSearch);
    this.handleAutoPlayClick = this.handleAutoPlayClick.bind(this);
  }

  componentDidMount(){
    this.props.searchYouTube({}, (videos)=>{
      this.setState({allVideos: videos});
      this.setState({currentVideo: videos[0]});
    });
  }
  
  handleVideoClick(event){
    var video = this.state.allVideos.find(function(element){
      return element.id.videoId === event.currentTarget.id;
    });
    this.setState({currentVideo: video});
  }

  handleSearch(event){
    this.props.searchYouTube({query: event.target.value}, (videos)=>{
      this.setState({allVideos: videos});
      this.setState({currentVideo: videos[0]});
    });
  }

  handleAutoPlayClick(){
    this.setState({autoplay: (this.state.autoplay ? 0 : 1)});
  }

  debounceHandler(func){
    var debounceFunc = _.debounce(func, 500);
    return function(e){
      e.persist();
      return debounceFunc(e);
    };  
  }
   
  render(){
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="col-md-6 offset-md-3">
            <div><Search handleSearch={this.bounceSearch} /></div>
          </div>
          <button className="btn btn-danger" data-toggle="button" aria-pressed="false" onClick={this.handleAutoPlayClick}>Auto Play</button>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><VideoPlayer video={this.state.currentVideo} autoplay={this.state.autoplay}/></div>
          </div>
          <div className="col-md-5">
            <div><VideoList callback={this.handleVideoClick} videos ={this.state.allVideos} /></div>
          </div>
        </div>
      </div>
    );
  }
}
// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
