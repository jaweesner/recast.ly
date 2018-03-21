
class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      allVideos: window.exampleVideoData,
      currentVideo: window.exampleVideoData[0]
    };
    this.handleVideoClick = this.handleVideoClick.bind(this);
  }

  handleVideoClick(event){
    var video = this.state.allVideos.find(function(element){
      return element.id.videoId === event.currentTarget.id;
    });
    this.setState({currentVideo: video});
  }
   
  render(){
    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <div><h5><em>search</em> view goes here</h5></div>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <div><h5><em>videoPlayer</em><VideoPlayer video={this.state.currentVideo}/></h5></div>
          </div>
          <div className="col-md-5">
            <div><h5><em>videoList</em> <VideoList callback = {this.handleVideoClick} videos ={this.state.allVideos} /> </h5></div>
          </div>
        </div>
      </div>
    );
  }
}
// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
