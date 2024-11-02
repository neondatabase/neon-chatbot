"use client";
import { IconMessage } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TextareaAutosize from "react-textarea-autosize";

import { useChat } from "ai/react";

export const Bubble = () => {
  const [open, setOpen] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputFocus, setInputFocus] = useState(false);
  //   const [input, setInput] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Type a message...");

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    keepLastMessageOnError: true,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  //   const handleSubmit = () => {
  //     console.log(input);
  //   };

  return (
    <>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className="h-14 w-14 absolute right-10 bottom-10 group bg-white flex  hover:bg-primary cursor-pointer items-center justify-center rounded-full shadow-derek transition duration-200"
      >
        <IconMessage className="h-6 w-6 text-neutral-600 group-hover:text-black" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-32 right-10 h-[40rem] w-[26rem] bg-gray-100 rounded-lg flex flex-col justify-between"
          >
            <div className="p-2 flex flex-1 overflow-y-auto">
              <div className="flex flex-1 flex-col">
                {messages.map((message) => (
                  <div key={message.id}>
                    {message.role === "user" ? (
                      <UserMessage content={message.content} />
                    ) : (
                      <AIMessage content={message.content} />
                    )}
                  </div>
                ))}
                <div className="pb-10" ref={messagesEndRef} />{" "}
                {/* Add this div as scroll anchor */}
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="textbox-grow-wrap max-h-[10vh] relative p-1"
            >
              <textarea
                ref={inputRef}
                disabled={disabled}
                className={`px-4 w-full rounded-lg border-[#f2f2f2] dark:placeholder:text-neutral-300 border py-[1rem] bg-white text-sm  [box-sizing:border-box] overflow-x-auto    inline-block focus:outline-none  transition duration-100`}
                placeholder={placeholderText}
                onFocus={() => setInputFocus(true)}
                onBlur={() => setInputFocus(false)}
                value={input}
                onChange={handleInputChange}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSubmit();
                  }
                }}
                rows={1}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const UserMessage = ({ content }: { content: string }) => {
  return (
    <div className="p-2 rounded-lg flex gap-2 items-start">
      <div className="h-8 w-8 rounded-full flex-shrink-0 bg-gradient-to-br from-pink-500 to-violet-600" />
      <div className="text-sm px-2 py-2 rounded-lg shadow-derek w-fit bg-white">
        {content}
      </div>
    </div>
  );
};

const AIMessage = ({ content }: { content: string }) => {
  return (
    <div className="p-2 rounded-lg flex gap-2 items-start">
      <div className="h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center bg-black">
        <NeonLogo />
      </div>
      <div className="text-sm px-2 py-2 rounded-lg shadow-derek w-full bg-black text-white">
        {content}
      </div>
    </div>
  );
};

const NeonLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
      className="h-4 w-4"
    >
      <g clip-path="url(#clip0_413_964)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 4.828C0 2.16 2.172 0 4.851 0H23.287C25.966 0 28.137 2.161 28.137 4.828V20.43C28.137 23.188 24.63 24.385 22.929 22.208L17.611 15.399V23.655C17.611 26.055 15.656 28 13.244 28H4.851C2.172 28 0 25.839 0 23.172V4.828ZM4.851 3.862C4.59443 3.862 4.34831 3.96364 4.16652 4.14469C3.98472 4.32574 3.88206 4.57143 3.881 4.828V23.172C3.881 23.706 4.316 24.138 4.851 24.138H13.39C13.658 24.138 13.73 23.922 13.73 23.655V12.585C13.73 9.825 17.237 8.629 18.938 10.806L24.257 17.615V4.828C24.257 4.294 24.307 3.862 23.772 3.862H4.851Z"
          fill="#12FFF7"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 4.828C0 2.16 2.172 0 4.851 0H23.287C25.966 0 28.137 2.161 28.137 4.828V20.43C28.137 23.188 24.63 24.385 22.929 22.208L17.611 15.399V23.655C17.611 26.055 15.656 28 13.244 28H4.851C2.172 28 0 25.839 0 23.172V4.828ZM4.851 3.862C4.59443 3.862 4.34831 3.96364 4.16652 4.14469C3.98472 4.32574 3.88206 4.57143 3.881 4.828V23.172C3.881 23.706 4.316 24.138 4.851 24.138H13.39C13.658 24.138 13.73 23.922 13.73 23.655V12.585C13.73 9.825 17.237 8.629 18.938 10.806L24.257 17.615V4.828C24.257 4.294 24.307 3.862 23.772 3.862H4.851Z"
          fill="url(#paint0_linear_413_964)"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 4.828C0 2.16 2.172 0 4.851 0H23.287C25.966 0 28.137 2.161 28.137 4.828V20.43C28.137 23.188 24.63 24.385 22.929 22.208L17.611 15.399V23.655C17.611 26.055 15.656 28 13.244 28H4.851C2.172 28 0 25.839 0 23.172V4.828ZM4.851 3.862C4.59443 3.862 4.34831 3.96364 4.16652 4.14469C3.98472 4.32574 3.88206 4.57143 3.881 4.828V23.172C3.881 23.706 4.316 24.138 4.851 24.138H13.39C13.658 24.138 13.73 23.922 13.73 23.655V12.585C13.73 9.825 17.237 8.629 18.938 10.806L24.257 17.615V4.828C24.257 4.294 24.307 3.862 23.772 3.862H4.851Z"
          fill="url(#paint1_linear_413_964)"
        />
        <path
          d="M23.2871 0C25.9661 0 28.1371 2.161 28.1371 4.828V20.43C28.1371 23.188 24.6301 24.385 22.9291 22.208L17.6101 15.399V23.655C17.6101 26.055 15.6561 28 13.2441 28C13.3077 28.0001 13.3707 27.9877 13.4294 27.9635C13.4882 27.9393 13.5416 27.9038 13.5867 27.8589C13.6317 27.8141 13.6675 27.7608 13.6919 27.7021C13.7164 27.6435 13.729 27.5806 13.7291 27.517V12.584C13.7291 9.826 17.2371 8.629 18.9391 10.807L24.2571 17.615V0.965C24.2558 0.708607 24.153 0.463167 23.9713 0.282336C23.7895 0.101506 23.5435 -3.4062e-06 23.2871 0Z"
          fill="#B9FFB3"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_413_964"
          x1="28.138"
          y1="28"
          x2="3.533"
          y2="-0.119997"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#B9FFB3" />
          <stop offset="1" stop-color="#B9FFB3" stop-opacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_413_964"
          x1="28.138"
          y1="28"
          x2="11.447"
          y2="21.476"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#1A1A1A" stop-opacity="0.9" />
          <stop offset="1" stop-color="#1A1A1A" stop-opacity="0" />
        </linearGradient>
        <clipPath id="clip0_413_964">
          <rect width="29" height="28" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
