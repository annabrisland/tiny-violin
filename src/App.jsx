import "./App.css";
import HandsPose from "./components/HandsPose";

function App() {
  
  // const [videoLoaded, setVideoLoaded] = useState(false);
  // const videoRef = useRef(null);
  // let detector = null;

  // useEffect(() => {
  //   const initializeHandDetection = async () => {
  //     try {
  //       const model = handPoseDetection.SupportedModels.MediaPipeHands;
  //       const detectorConfig = {
  //         runtime: 'mediapipe', // or 'tfjs'
  //         modelType: 'full'
  //       };
  //       detector = await handPoseDetection.createDetector(model, detectorConfig);

  //       const videoElement = videoRef.current;
  //       const hands = await detector.estimateHands(videoElement);
  //       console.log()
  //       console.log(hands); // Do something with the estimated hands data
  //     } catch (error) {
  //       console.log("Error initializing hand detection:", error);
  //     }
  //   };

  //   if (videoLoaded) {
  //     initializeHandDetection();
  //   }

  //   return () => {
  //     // Cleanup logic if needed
  //   };
  // }, [videoLoaded]);

  // const handleVideoLoaded = () => {
  //   setVideoLoaded(true);
  // };

  return (
    <div>
    <HandsPose />
    </div>
  );
}

export default App;
