import { useState, useCallback } from "react";

// This is a simple wrapper to simplify handing of async functions
// in React components. It return an object with the following:
//   isPending - boolean (is request pending)
//   data - data returned from the async function
//   error - error returned from the async function
//   run - function wrapper
//   setData - function to set data
//   setError - function to set error
const useAsync = (asyncFunction) => {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const run = useCallback(
    async (...args) => {
      setIsPending(true);

      // since all requests are using supabase, it is not throwing any errors
      // instead it returns it in error object from the request
      // that's why we can omit try/catch block here
      const { data, error, ...rest } = await asyncFunction(...args);

      if (error) {
        setError(error);
        setIsPending(false);
        setData(null);
      } else {
        setError(null);
        setData(data);
        setIsPending(false);
      }

      return { data, error, ...rest };
    },
    [asyncFunction]
  );

  return {
    isPending,
    data,
    error,
    run,
    setData,
    setError,
  };
};

export default useAsync;
