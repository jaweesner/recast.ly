
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
      currentVideo: blankData[0]
    };
    this.handleVideoClick = this.handleVideoClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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
    var query = document.getElementsByClassName('form-control')[0].value;
    
    this.props.searchYouTube({query: query}, (videos)=>{
      this.setState({allVideos: videos});
      this.setState({currentVideo: videos[0]});
    });
  }
   
  render(){
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><Search handleSearch={this.handleSearch} /></h5></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><h5><VideoPlayer video={this.state.currentVideo}/></h5></div>
          </div>
          <div className="col-md-5">
            <div><h5><VideoList callback={this.handleVideoClick} videos ={this.state.allVideos} /> </h5></div>
          </div>
        </div>
      </div>
    );
  }
}
// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
