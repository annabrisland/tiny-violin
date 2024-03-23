import React from "react";
import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import * as handPoseDetection from "../node_modules/@tensorflow-models/hand-pose-detection";
import { drawHands, findTouchingFingers, playNote } from "./utils";

function HandsPose({sound}) {
  const [detector, setDetector] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [whichFinger, setWhichFinger] = useState([
    { finger:"Right-index", play: false },
    { finger:"Right-middle", play: false },
    { finger:"Right-ring", play: false },
    { finger:"Right-pinky", play: false },
    { finger:"Left-index", play: false },
    { finger:"Left-middle", play: false },
    { finger:"Left-ring", play: false },
    { finger:"Left-pinky", play: false },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (fingerID) => {
    setWhichFinger(whichFinger =>
      whichFinger.map((finger) =>
      fingerID.includes(finger.finger) ? { ...finger, play: true } : { ...finger, play: false }
      )
    );
  }

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
          // Draw hands on canvas
          const ctx = canvasRef.current.getContext("2d");
          drawHands(hands, ctx);
          // Check if & which fingers are touching
          const touchingFingers = findTouchingFingers(hands, 15);
          togglePlay(touchingFingers);
        }
      } catch (error) {
        console.log("Error detecting hands:", error);
      }
    };

    // Run hand detection periodically
    const intervalId = setInterval(runHandDetection, 10);

    return () => clearInterval(intervalId);
  }, [detector]);

  // Play note when fingers are touching
  useEffect(() => {
    whichFinger.forEach((finger) => {
      if (finger.play && !isPlaying && sound) {
        setIsPlaying(true);
        playNote(finger.finger);
        setTimeout(() => {
          setIsPlaying(false);
        }, 150);
      }
    });
  }, [whichFinger, isPlaying, sound]);

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
      <canvas className="canvas-feed" ref={canvasRef} />
    </div>
  );
}

export default HandsPose;
