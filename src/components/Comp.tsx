import useJsonFetch from "../hooks/useJsonFetch";

const Comp = () => {

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