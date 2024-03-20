import React from "react";
import "./Landing.css";
import violinHand from "../../assets/images/violin.png";

function Landing() {
  return (
    <div>
      <h1>Tiny Violin</h1>
      <img className="landingImg" src={violinHand} alt="violin" />
    </div>
  );
}

export default Landing;