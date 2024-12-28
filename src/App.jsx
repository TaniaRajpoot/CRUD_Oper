import { useState } from "react";
import { Posts } from "./Components/Posts";

const App = () => {
  const [data, setData] = useState([]); // yahan pr state manage krnii hai ta k post.jsx se data sae se fetch ho

  return (
    <section className="main-section">
      <Posts data={data} setData={setData} /> {/* props ko idr pass kr dena ha ta k data display ho jaye */}
    </section>
  );
};

export default App;