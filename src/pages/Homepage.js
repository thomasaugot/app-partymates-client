import { Link } from "react-router-dom";
import "./Homepage.css";

function HomePage(props) {
  return (
    <div className="HomePage">
      <div class="slide-effect">
        <div class="text">
          Looking to attend an event but no one to go with?&nbsp;
        </div>
        <div>
          <div class="slideDown">Find your new party mates here!</div>
        </div>
      </div>

      <h2 className="FtTitle">Featured events</h2>

      <iframe
        className="videos"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/0t2tPqDge14?autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>

      <iframe
        className="videos"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/RFIKvmp-8Qg?autoplay=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <div className="link">
        <Link className="link" to="/events">See all the events</Link>
      </div>
    </div>
  );
}

export default HomePage;
