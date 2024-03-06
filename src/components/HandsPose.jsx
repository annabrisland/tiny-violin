import React from "react";
import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import * as mpHands from "@mediapipe/hands";

function HandsPose() {

    const [detector, setDetector] = useState(null);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const webcamRef = useRef(null);
  
    useEffect(() => {
      const initializeHandDetection = async () => {
        try {
          const model = handPoseDetection.SupportedModels.MediaPipeHands;
          const detectorConfig = {
            runtime: 'mediapipe', // or 'tfjs',
            solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
            modelType: 'full'
          }
          const detector = await handPoseDetection.createDetector(model, detectorConfig);
          setDetector(detector);
        } catch (error) {
          console.log("Error initializing hand detection:", error);
        }
      };
  
      if (!detector && videoLoaded) {
        initializeHandDetection();
      }
  
      
    }, [detector, videoLoaded]);
  
    useEffect(() => {
      const runHandDetection = async () => {
        try {
          const webcam = webcamRef.current.video;
          if (detector && webcam) {
            const hands = await detector.estimateHands(webcam);
            console.log(hands); // Do something with the estimated hands data
          }
        } catch (error) {
          console.log("Error detecting hands:", error);
        }
      };
  
      const intervalId = setInterval(runHandDetection, 100); // Run hand detection periodically
  
      return () => clearInterval(intervalId);
    }, [detector]);
  
    const handleVideoLoaded = () => {
      setVideoLoaded(true);
    };
  
    return (
      <div>
        <Webcam
          id="webcam"
          mirrored={true}
          ref={webcamRef}
          audio={false}
          width={640}
          height={480}
          onUserMedia={() => handleVideoLoaded()}
        />
      </div>
    );
}

export default HandsPose;