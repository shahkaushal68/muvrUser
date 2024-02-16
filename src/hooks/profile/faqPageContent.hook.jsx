import { useEffect, useState } from "react";
import { doFetchPagesContent } from "../../actions";
import { useLocation } from "react-router-dom";
import { getDescryptionString } from "../../services";

export const useFaqPageContentHook = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [faqPageContent, setFaqPageContent] = useState({});
  const [pageContent, setPageContent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      fetchFaqDetails();
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const fetchFaqDetails = async () => {
    const faqPageResponse = await doFetchPagesContent(pathname);
    if (faqPageResponse?.status === 200) {
      const faqPageList = JSON.parse(getDescryptionString(faqPageResponse?.data?.data));
      console.log(faqPageList);
      if (faqPageList?.page?.content) {
        setPageContent(JSON.parse(faqPageList?.page?.content));
       }
      setFaqPageContent(faqPageList?.page);
    }
    setLoading(false);
  };

  const handleFaqSearch = async (event) => {
    const query = event?.target?.value;
    setSearchQuery(query);
    const filteredItems = [];
    pageContent?.forEach((faqSection) => {
      const filterContent = faqSection?.questions?.filter((questionDetails) => {
        return questionDetails.question.toLowerCase().includes(query.toLowerCase()) || questionDetails.answer.toLowerCase().includes(query.toLowerCase());
      });
      if (filterContent?.length > 0) {
        filteredItems.push({
          ...faqSection,
          questions: filterContent,
        });
      }
    });
    setFilterData(filteredItems);
  };
  useEffect(() => {
    handleFaqSearch({ target: { value: searchQuery } });
  }, [pageContent, searchQuery]);

  return {
    loading,
    faqPageContent,
    filterData,
    searchQuery,
    handleFaqSearch,
  };
};
