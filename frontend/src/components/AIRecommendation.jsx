import { useState } from "react";
import axios from "axios";

const AIRecommendation = () => {
  const [interest, setInterest] = useState("");
  const [result, setResult] = useState("");

  const getRecommendations = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ai/recommend`,
      { userInterest: interest },
    );
    setResult(res.data.recommendations);
  };

  return (
    <div className="max-w-xl mx-auto">
      <input
        className="border p-2 w-full mb-4"
        placeholder="e.g. best web development course"
        onChange={(e) => setInterest(e.target.value)}
      />
      <button onClick={getRecommendations} className="btn btn-accent w-full">
        Get AI Recommendations
      </button>
      <pre className="mt-4 text-sm whitespace-pre-wrap">{result}</pre>
    </div>
  );
};

export default AIRecommendation;
