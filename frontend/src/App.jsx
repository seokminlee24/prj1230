
// Axios 인터셉터 설정
import axios from "axios";

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {
  return (
    <>
      <div>hello</div>
    </>
  );
}

export default App;
