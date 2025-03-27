/***********************************
Call useDetectScreenSize to obtain 
height and width in real time

-----------------------------------

No external installation required
************************************/

import { useEffect, useState } from "react";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    width,
    height,
  };
};

const useDetectScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getWindowDimensions);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getWindowDimensions);
    };

    window.addEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

export default useDetectScreenSize;
