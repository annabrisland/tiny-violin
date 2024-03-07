export const drawHands = (handsData, ctx) => {
  // Check for data
  if (handsData.length > 0) {
    // Loop through each prediction
    handsData.forEach((data) => {
      // Take keypoints data
      const keypoints = data.keypoints;
      // Loop through keyopoints and draw each point
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
