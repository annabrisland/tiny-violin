// Define finger points
const fingerPoints = {
  thumb: [0, 1, 2, 3, 4],
  indexfinger: [0, 5, 6, 7, 8],
  middlefinger: [0, 9, 10, 11, 12],
  ringfinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Function to draw hands
export const drawHands = (handsData, ctx) => {
  // Check for data
  if (handsData.length > 0) {
    // Loop through each prediction
    handsData.forEach((data) => {
      // Take keypoints data
      const keypoints = data.keypoints;
      // Loop through finger points
      for (let finger in fingerPoints) {
        // Get finger points
        const points = fingerPoints[finger];
        // Loop through finger points and draw lines
        for (let i = 0; i < points.length - 1; i++) {
          // Get X and Y
          const firstPoint = keypoints[points[i]];
          const secondPoint = keypoints[points[i + 1]];
          // Draw line
          // ctx.filter = "blur(10px)";
          ctx.beginPath();
          ctx.moveTo(firstPoint.x, firstPoint.y);
          ctx.lineTo(secondPoint.x, secondPoint.y);
          // Set line styles
          ctx.strokeStyle = "white";
          ctx.lineWidth = 5;
          ctx.stroke();
        }
      }
      // Loop through keypoints and draw each point
      for (let i = 0; i < keypoints.length; i++) {
        // Get X
        const X = keypoints[i].x;
        // Get Y
        const Y = keypoints[i].y;
        // Draw
        ctx.beginPath();
        ctx.arc(X, Y, 5, 0, 3 * Math.PI);
        // Set line styles
        ctx.fillStyle = "white";
        ctx.fill();
      }
    });
  }
};

// Function to find touching fingers
export const findTouchingFingers = (handsData, distanceThreshold) => {
  if (handsData.length > 0) {
    const touchingFingers = [];
    // Loop through left and right hands
    handsData.forEach((data) => {
      // Check which hand it is
      const handedness = data.handedness;
      // Get thumb and fingertips
      const fingertips = {
        thumb: data.keypoints[4],
        index: data.keypoints[8],
        middle: data.keypoints[12],
        ring: data.keypoints[16],
        pinky: data.keypoints[20],
      };
      // Loop through fingertips and check distance from thumb
      for (let finger in fingertips) {
        if (finger !== "thumb") {
          // Calculate distance between thumb and finger
          const thumbFingerDistance = Math.hypot(
            fingertips.thumb.x - fingertips[finger].x,
            fingertips.thumb.y - fingertips[finger].y
          );
          if (thumbFingerDistance < distanceThreshold) {
            // Makes handTouching an object with the finger and touching status
            const handTouching = handedness + "-" + finger;
            touchingFingers.push(handTouching);
          }
        }
      }
    });
    return touchingFingers;
  }
  return [];
};

// Function to play note
export const playNote = (finger) => {
  const note = {
    'Right-index': "EmLong",
    'Right-middle': "AmLong",
    'Right-ring': "DmLong",
    'Right-pinky': "GLong",
    'Left-index': "CLong",
    'Left-middle': "FLong",
    'Left-ring': "BsharpLong",
    'Left-pinky': "BdimLong",
  };
  const audio = new Audio(`src/assets/notes/${note[finger]}.wav`);
  audio.play();
};