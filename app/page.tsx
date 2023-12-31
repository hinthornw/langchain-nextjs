"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import type { Message } from "ai/react";
import type { FormEvent } from "react";

function ChatMessage(props: { message: Message }) {
  const colorClassName =
    props.message.role === "user" ? "bg-sky-600" : "bg-slate-50 text-black";
  const alignmentClassName =
    props.message.role === "user" ? "mr-auto" : "ml-auto";
  return (
    <div
      className={`${alignmentClassName} ${colorClassName} rounded px-4 py-2 max-w-[80%] mb-8`}
    >
      {props.message.content}
    </div>
  );
}

export default function Home() {
  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({});

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (messageContainerRef.current) {
      messageContainerRef.current.classList.add("h-[50vh]");
    }
    if (isLoading) {
      return;
    }
    handleSubmit(e);
  }

  return (
    <div className="flex flex-col items-center mt-48">
      <div
        className="flex flex-col-reverse w-[80%] grow mb-4 overflow-scroll"
        ref={messageContainerRef}
      >
        {[...messages].reverse().map((m) => (
          <ChatMessage key={m.id} message={m}></ChatMessage>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex w-[80%]">
        <input
          className="grow mr-12 p-4 rounded"
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit" className="px-8 py-4 bg-sky-600 rounded">
          Send
        </button>
      </form>
    </div>
  );
}
