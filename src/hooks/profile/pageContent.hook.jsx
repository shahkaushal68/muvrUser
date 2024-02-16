import { useEffect, useState } from "react";
import { doFetchPagesContent } from "../../actions";
import { useLocation } from "react-router-dom";
import { getDescryptionString } from "../../services";

export const usePageContentHook = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [faqPageContent, setFaqPageContent] = useState({});
  const [pageContent, setPageContent] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      fetchFaqDetails();
    } catch (error) {
      //console.error("Error:", error);
    }
  }, []);

  const fetchFaqDetails = async () => {
    const faqPageResponse = await doFetchPagesContent(pathname);
    //console.log(faqPageResponse);
    if (faqPageResponse?.status === 200) {
      const faqPageList = JSON.parse(getDescryptionString(faqPageResponse?.data?.data));
      //console.log(faqPageList);
      if (faqPageList?.page?.content) {
        setPageContent(JSON.parse(faqPageList?.page?.content));
      }
      setFaqPageContent(faqPageList?.page);
    }
    setLoading(false);
  };

  return {
    loading,
    faqPageContent,
    pageContent,
  };
};
