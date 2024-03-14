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
          ctx.beginPath();
          ctx.moveTo(firstPoint.x, firstPoint.y);
          ctx.lineTo(secondPoint.x, secondPoint.y);
          // Set line styles
          ctx.strokeStyle = "indigo";
          ctx.lineWidth = 4;
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
        ctx.fillStyle = "indigo";
        ctx.fill();
      }
    });
  }
};

// Function to find touching fingers
export const findTouchingFingers = (handsData, distanceThreshold) => {
  if (handsData.length > 0) {
    // Get thumb and fingertips
    const fingertips = {
      thumb: handsData[0].keypoints[4],
      index: handsData[0].keypoints[8],
      middle: handsData[0].keypoints[12],
      ring: handsData[0].keypoints[16],
      pinky: handsData[0].keypoints[20],
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
          return true;
        }
      }
    }
  }
  return false;
}

// Function to play note
export const playNote = (note) => {
  const audio = new Audio(`../assets/notes/${note}.mp3`);
  audio.play();
  console.log("Playing note:", note);
};