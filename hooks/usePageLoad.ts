import { useEffect, useState } from "react";

const usePageLoad = () => {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  return pageLoaded;
};

export default usePageLoad;
