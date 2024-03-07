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
        console.log("Hand Pose ready!");
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
        // Get & set video properties
        const video = webcamRef.current.video;
        const videoHeight = video.videoHeight;
        const videoWidth = video.videoWidth;

        webcamRef.videoHeight = videoHeight;
        webcamRef.videoWidth = videoWidth;

        // Set canvas properties
        canvasRef.videoHeight = videoHeight;
        canvasRef.videoWidth = videoWidth;
        const canvasContainer = document.querySelector(".canvas-wrapper");
        canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`;

        if (detector && webcam) {
          const hands = await detector.estimateHands(webcam, {flipHorizontal: true});
          console.log(hands);
          const ctx = canvasRef.current.getContext("2d");
          var scale = window.devicePixelRatio;
          canvasRef.current.width = Math.floor(videoWidth * scale);
          canvasRef.current.height = Math.floor(videoHeight * scale);
          drawHands(hands, ctx);
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

  //   const webcamRef = useRef(null);
  //   const canvasRef = useRef(null);

  //   // Set Handpose model
  //   useEffect(() => {
  //       const initializeHandDetection = async () => {
  //       try {
  //         const model = handPoseDetection.SupportedModels.MediaPipeHands;
  //         const detectorConfig = {
  //           runtime: "mediapipe",
  //           solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/hands",
  //           modelType: "full",
  //           flipHorizontal: true,
  //         };
  //         const tempDetector = await handPoseDetection.createDetector(
  //           model,
  //           detectorConfig
  //         );
  //         setDetector(tempDetector);
  //         console.log("Hand Pose Detection Loaded");
  //       } catch (error) {
  //         console.log("Error initializing hand detection:", error);
  //       }
  //   }
  // initializeHandDetection()});

  //   const runHandPose = async () => {
  //     // Loop to continuously detect hands
  //     setInterval(() => {
  //       detect(detector);
  //     }, 100);
  //   };

  //   const detect = async (net) => {
  //     if (
  //       typeof webcamRef !== "undefined" &&
  //       webcamRef.current !== null &&
  //       webcamRef.current.video.readyState === 4
  //     ) {
  //       // Get & set video properties
  //       const video = webcamRef.current.video;
  //       const videoHeight = video.videoHeight;
  //       const videoWidth = video.videoWidth;

  //       webcamRef.videoHeight = videoHeight;
  //       webcamRef.videoWidth = videoWidth;

  //       // Set canvas properties
  //       canvasRef.videoHeight = videoHeight;
  //       canvasRef.videoWidth = videoWidth;

  //       // Detect hands
  //       const hands = await net.estimateHands(video);
  //       console.log(hands);
  //       const ctx = canvasRef.current.getContext("2d");
  //       drawHands(hands, ctx)
  //     }
  //   };

  //   useEffect(() => {
  //     runHandPose();
  //   })

  return (
    <div>
      <Webcam
        className="video-feed"
        style={{
          width: 640,
          height: 480,
        }}
        id="webcam"
        mirrored={true}
        ref={webcamRef}
        audio={false}
        onUserMedia={() => handleVideoLoaded()}
      />
      <div className="canvas-wrapper">
        <canvas
          className="video-feed canvas"
          style={{
            width: 640,
            height: 480,
          }}
          ref={canvasRef}
        />
      </div>
    </div>
  );
}

export default HandsPose;
