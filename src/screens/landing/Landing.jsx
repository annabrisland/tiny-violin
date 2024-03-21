import React from "react";
import "./Landing.css";
import violinHand from "../../assets/images/violin.png";
import letsPlay from "../../assets/images/letsPlay.png";

function Landing() {
  return (
    <div className="landing">
      <h1>Tiny Violin</h1>
      <a href="/violin">
        <img className="landingBtn" src={letsPlay} alt="let's play" />
      </a>
      {/* <img className="landingImg" src={violinHand} alt="violin" /> */}
    </div>
  );
}

export default Landing;
