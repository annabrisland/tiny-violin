import React from "react";
import "./Landing.css";
import violin from "../../assets/images/violin.png";
import text from "../../assets/images/text.png";
import arrow from "../../assets/images/arrow.png";
import help from "../../assets/images/help.png";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="landing">
      <div className="title">
        <img className="landingImg" src={violin} alt="violin" />
        <img className="landingText" src={text} alt="violin" />
      </div>
      <Link to="/violin">
        <img className="arrowImg" src={arrow} alt="arrow" />
      </Link>
      <div className="proj-info">
      <img className="infoBtn" src={help} alt="help" />
        <div className="proj-text">
          <div>
            Tiny Violin explores gesture based interaction by allowing users to
            enjoy creating music through device interaction.
          </div>
          <div>
            Users can play a range of 8 notes by touching fingers to thumbs.
          </div>
          <hr></hr>
          <div className="creator-info">
            <div>Created by</div>
            <a href="https://annabrisland.com" target="blank" className="info-link">Anna Brisland</a>
          </div>
          <div className="ref-info">
            <div>References</div>
            <a href="https://blog.tensorflow.org/2021/11/3D-handpose.html" targret="blank" className="info-link">TensorFlow, MediaPipe</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
