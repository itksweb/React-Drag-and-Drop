import { useState } from "react";
import "./App.css";
import Dragg from "./components/Dragg";
import SortDrag from "./components/SortDrag";

function App() {
  const [sample, setSample] = useState(0);

  return (
    <>
      <div className={`btns flex items-center py-3 justify-center`}>
        {sample !== 1 && (
          <button
            className="rounded text-white bg-green-700 mx-2"
            onClick={() => setSample(1)}
          >
            Sample 1
          </button>
        )}
        {sample !== 2 && (
          <button
            className="rounded text-white bg-green-700 mx-2 "
            onClick={() => setSample(2)}
          >
            Sample 2
          </button>
        )}
      </div>
      {sample === 1 && <Dragg />}
      {sample === 2 && <SortDrag />}
    </>
  );
}

export default App;
