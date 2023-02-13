import { Link } from "react-router-dom";
import "./Homepage.css";

function HomePage(props) {
  return (
    <div className="HomePage">
      <div class="slide-effect">
        <div class="text">Wanna go party but no one to go with?&nbsp;</div>
        <div>
          <div class="slideDown">Find your new party mates here!</div>
        </div>
      </div>

      <h2 className="FtTitle">Featured events</h2>
      <div className="videosSection">
        <iframe
          className="videos"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/0t2tPqDge14?autoplay=1&mute=1&controls=0&loop=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>

        <iframe
          className="videos"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/RFIKvmp-8Qg?autoplay=1&mute=1&controls=0&loop=1"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      <p className="parag">
        For those who love to party.<br></br>
        <br></br> For those who love music but haven't yet found friends to
        share it with.<br></br>
        <br></br> You're in the right place now. <br></br> <br></br>
        Browse events,<br></br>
        <br></br> Connect with fellow party goers and create lifelong
        friendships!
      </p>
      <div className="link">
        <Link className="link" to="/events">
          See all the events
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
