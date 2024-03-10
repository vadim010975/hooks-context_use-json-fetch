import { useState, useEffect } from "react";

const Comp = () => {

  type Data = {
    status: string
  }

  type UseJsonFetch = (
    url: string,
    opts: {
      pathname: string,
    }
  ) => [
    data: Data | undefined,
    loading: boolean,
    error: Error | undefined,
  ];

  const useJsonFetch: UseJsonFetch = (url, opts) => {
  
    const [data, setData] = useState<Data>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error>();

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url + opts.pathname);
        if (response.status < 200 || response.status > 299) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setData(data);
      } catch (e) {
        setError(e as Error);
      } finally { setLoading(false); }
    }

    useEffect(() => {
      fetchData();
    }, []);
  
    return [data, loading, error];
  }

  const [data, loading, error] = useJsonFetch(
    "http://localhost:7070/",
    { pathname: "loading" }
  );

  return (
    <div>
      {loading && <div>Загрузка...</div>}
      {data && <div>Status: {data.status}</div>}
      {error && <div>Ошибка: {error.message}</div>}
    </div>
  )
}

export default Comp;