import React from "react";
import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { drawHands } from "./utils";

function HandsPose() {
  const [detector, setDetector] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const initializeHandDetection = async () => {
      try {
        const model = handPoseDetection.SupportedModels.MediaPipeHands;
        const detectorConfig = {
          runtime: "mediapipe",
          solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
          modelType: "full",
        };
        const detector = await handPoseDetection.createDetector(
          model,
          detectorConfig
        );
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
        // Get & set video properties
        const webcam = webcamRef.current.video;
        const videoHeight = webcam.videoHeight;
        const videoWidth = webcam.videoWidth;

        webcamRef.videoHeight = videoHeight;
        webcamRef.videoWidth = videoWidth;

        // Set canvas properties
        canvasRef.current.height = videoHeight;
        canvasRef.current.width = videoWidth;

        if (detector && webcam) {
          const hands = await detector.estimateHands(webcam, {
            flipHorizontal: true,
          });
          const ctx = canvasRef.current.getContext("2d");
          drawHands(hands, ctx);
        }
      } catch (error) {
        console.log("Error detecting hands:", error);
      }
    };

    // Run hand detection periodically
    const intervalId = setInterval(runHandDetection, 10);

    return () => clearInterval(intervalId);
  }, [detector]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
  };

  return (
    <div>
      <Webcam
        className="video-feed"
        id="webcam"
        mirrored={true}
        ref={webcamRef}
        audio={false}
        onUserMedia={() => handleVideoLoaded()}
      />
      <canvas className="video-feed" ref={canvasRef} />
    </div>
  );
}

export default HandsPose;
