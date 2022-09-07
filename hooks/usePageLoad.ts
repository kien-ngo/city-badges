import { useEffect, useState } from "react";

const usePageLoad = () => {
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [isPageLoading, setPageLoading] = useState<boolean>(true);
  useEffect(() => {
    setPageLoaded(true);
    setPageLoading(false);
  }, []);

  return { pageLoaded, isPageLoading };
};

export default usePageLoad;
