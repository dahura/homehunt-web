"use client";

import { Apartment } from "@/types/apartment";
import { useState } from "react";

// Define the structure of your message object here
interface Message {
  // For example, if a message has a 'text' and 'timestamp', you can define it as:
  // text: string;
  // timestamp: number;
  answer: string;
  apartments: Apartment[];
}

const useApartmentStream = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const sendPrompt = async () => {
    try {
      const response = await fetch("http://localhost:3000/send-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to send prompt");
      }

      const { promptId } = await response.json();
      listenForUpdates(promptId);
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  };

  const listenForUpdates = (promptId: string) => {
    const eventSource = new EventSource(
      `http://localhost:3000/stream-apartments/${promptId}`
    );

    eventSource.onmessage = (event: MessageEvent) => {
      const data: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    eventSource.onerror = (error) => {
      console.error("Error with SSE:", error);
      eventSource.close();
    };
  };

  return { prompt, setPrompt, messages, sendPrompt };
};

const ApartmentStream: React.FC = () => {
  const { prompt, setPrompt, messages, sendPrompt } = useApartmentStream();

  return (
    <div>
      <h1>Apartment Stream</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
        className="p-2 text-black border border-gray-300 rounded-md"
      />
      <button onClick={sendPrompt}>Send Prompt</button>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{JSON.stringify(message)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApartmentStream;
