import { useEffect, useState } from "react";

const useFetchAPIContent = (apiUrl) => {
  /* Initializing state variables */
  const [content, setContent] = useState(null);

  /* Function that fetches data from given API URL */
  async function fetchAPIContent() {
    /* Retrieving and converting content to JSON data */
    const response = await fetch(apiUrl);
    const data = await response.json();

    /* Setting state variable */
    setContent(data);
  }

  useEffect(() => {
    fetchAPIContent();
  }, []);

  return content;
};

export default useFetchAPIContent;
