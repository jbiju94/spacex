import React, { useState } from "react";
import { useHistory } from "react-router-dom"

const getQuery = () => {
  if (typeof window !== "undefined") {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

const getQueryStringVal = (key)=> {
  return getQuery().get(key);
};

export default function useQueryParam (key,defaultVal) {
  const [query, setQuery] = useState(getQueryStringVal(key) || defaultVal);

  const history = useHistory();

  const updateUrl = (newVal) => {
    setQuery(newVal);

    const query = getQuery();

    if (newVal.trim() !== "") {
      query.set(key, newVal);
    } else {
      query.delete(key);
    }

    // This check is necessary if using the hook with Gatsby
    if (typeof window !== "undefined") {
      const { protocol, pathname, host } = window.location;
      const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`;
      history.push({search: query.toString()})
      //window.history.pushState({}, "", newUrl);
    }
  };

  return [query, updateUrl];
};

