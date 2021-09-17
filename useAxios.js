import { useEffect, useRef, useState } from "react";
import "./styles.css";
import defaultAxios from "axios";

const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  });
  const [trigger, setTrigger] = useState(0);

  // opts url이 존재하지 않으면. 반환X
  if (!opts.url) {
    return;
  }

  const refetch = () => {
    setState({
      ...state,
      loading: true
    });
    setTrigger(Date.now());
  };

  useEffect(() => {
    axiosInstance(opts)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data
        });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error });
      });
  }, [trigger]);

  return { ...state, refetch };
};

const App = () => {
  const { loading, error, data, refetch } = useAxios({
    url: "https://yts.mx/api/v2/list_movies.json"
  });
  // console.log(
  //   `Loading: ${loading}\nError: ${error}\nData: ${JSON.stringify(data)}`
  // );

  return (
    <div className="App">
      <h1>{data && data.status}</h1>
      <h2>{loading && "Loading..."}</h2>
      <button onClick={refetch}>Refetch</button>
    </div>
  );
};

export default App;
