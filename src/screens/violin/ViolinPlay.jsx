import { useState } from "react";
import "./ViolinPlay.css";
import HandsPose from "../../components/HandsPose";
import hands from "../../assets/images/hands.png";
import help from "../../assets/images/help.png";
import soundOn from "../../assets/images/soundOn.png";
import soundOff from "../../assets/images/soundOff.png";

function ViolinPLay() {
  const [sound, setSound] = useState(true);
  const soundControl = () => {
    setSound(!sound);
  };
  
  return (
    <div>
      <img
        className="soundControl"
        src={`${sound ? soundOn : soundOff}`}
        alt="sound-control"
        onClick={soundControl}
      />
      <HandsPose sound={sound}/>
      <div className="instructions">
        <img className="instructionsBtn" src={help} alt="help" />
        <div className="instructionsContent">
          <img src={hands} alt="hands" />
        </div>
      </div>
    </div>
  );
}

export default ViolinPLay;
