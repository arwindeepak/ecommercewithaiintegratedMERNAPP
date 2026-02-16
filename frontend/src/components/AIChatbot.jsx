import { useState } from "react";
import axios from "axios";

const AIChatbot = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  const sendMessage = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/ai/chat`,
      { message },
    );
    setReply(res.data.reply);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl p-4 rounded-xl">
      <h3 className="font-bold mb-2">AI Support</h3>
      <input
        className="border p-2 w-full mb-2"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask anything..."
      />
      <button onClick={sendMessage} className="btn btn-accent w-full">
        Ask
      </button>
      <p className="mt-3 text-sm">{reply}</p>
    </div>
  );
};

export default AIChatbot;
