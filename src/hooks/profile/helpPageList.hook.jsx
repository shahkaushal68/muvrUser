import { useEffect, useState } from "react";
import { doFetchHelpPagesList } from "../../actions";
import { getDescryptionString } from "../../services";

export const useHelpPageListHook = () => {
  const [loading, setLoading] = useState(false);
  const [helpPageList, setHelpPageList] = useState([]);

  useEffect(() => {
    try {
      setLoading(true);
      fetchPageList();
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const fetchPageList = async () => {
    const pageListResponse = await doFetchHelpPagesList();
    if (pageListResponse?.status === 200) {
      const pageList = JSON.parse(getDescryptionString(pageListResponse?.data?.data));
      setHelpPageList(pageList);
    }
    setLoading(false);
  };
  return {
    loading,
    helpPageList,
  };
};
