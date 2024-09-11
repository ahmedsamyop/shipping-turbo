import { useEffect, useState } from "react";

function useResizeScreen() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      const x = window.innerWidth;
      setWidth(x);
      console.log(x);
    });
  }, []);

  return width;
}

export default useResizeScreen;
