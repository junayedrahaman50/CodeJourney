import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        // Setting isPending to false once we have the data, therefore updating the state
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.error("fetch aborted");
        } else {
          // set isPending message to false when having an error
          setIsPending(false);
          setError(err.message);
        }
      });
  }, [url]);

  return { data, isPending, error, setData };
};

export default useFetch;
