"use client";
import {
  IconArrowNarrowDown,
  IconArrowNarrowUp,
  IconAssembly,
  IconBrandMessenger,
  IconMessage,
  IconPlayerStopFilled,
  IconPlus,
  IconSeo,
  IconTerminal2,
  IconTrashFilled,
  IconX,
} from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useChat } from "ai/react";
import Markdown from "react-markdown";
import { cn } from "@/lib/utils";

export const Bubble = () => {
  const [open, setOpen] = useState(true);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [inputFocus, setInputFocus] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Type a message...");
  const [autoScroll, setAutoScroll] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const messageHistoryRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    append,
    isLoading,
    stop,
    setMessages,
  } = useChat({
    keepLastMessageOnError: true,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const blocks = [
    {
      icon: <IconSeo className="h-6 w-6 text-purple-500" />,
      title: "SEO Tips",
      content: "How can I improve my blog on tech",
    },
    {
      icon: <IconTerminal2 className="h-6 w-6 text-indigo-500" />,
      title: "Code",
      content: "How to center a div with Tailwind CSS",
    },
    {
      icon: <IconBrandMessenger className="h-6 w-6 text-pink-500" />,
      title: "Communication",
      content: "How to improve communication with my team",
    },
    {
      icon: <IconAssembly className="h-6 w-6 text-orange-500" />,
      title: "Productivity",
      content: "How to increase productivity in my work while being occupied",
    },
  ];

  const handleBlockClick = (content: string) => {
    append({
      role: "user",
      content: content,
    });

    handleSubmit();
  };

  useEffect(() => {
    const handleUserScroll = () => {
      if (messageHistoryRef.current) {
        const isAtBottom =
          messageHistoryRef.current.scrollHeight -
            messageHistoryRef.current.scrollTop ===
          messageHistoryRef.current.clientHeight;
        setIsUserScrolledUp(!isAtBottom);
      }
    };

    messageHistoryRef.current?.addEventListener("scroll", handleUserScroll);

    return () => {
      messageHistoryRef.current?.removeEventListener(
        "scroll",
        handleUserScroll
      );
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setTimeout(() => {
          setShowScrollButton(!entry.isIntersecting);
        }, 100);
      },
      {
        root: null,
        threshold: 0.3,
        rootMargin: "100px",
      }
    );

    if (messagesEndRef.current) {
      const currentRef = messagesEndRef.current;
      observer.observe(currentRef);
      return () => {
        observer.unobserve(currentRef);
      };
    }
  }, [messages]);

  useEffect(() => {
    if (!isUserScrolledUp && messages.length) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isUserScrolledUp]);

  useEffect(() => {
    if (autoScroll && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, autoScroll]);

  const scrollIntoView = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      setShowScrollButton(false);
      setIsUserScrolledUp(false);
      setAutoScroll(true);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 flex flex-col items-end z-30">
      <div className="fixed md:relative inset-0 z-20">
        {open && (
          <button
            onClick={() => setOpen(false)}
            className="fixed md:hidden top-2 right-2 z-40"
          >
            <IconX />
          </button>
        )}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: 20, rotateX: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-4 h-screen md:h-[46vh] min-h-[76vh] w-full md:w-[30rem] bg-gray-100 rounded-lg flex flex-col justify-between overflow-hidden"
            >
              <div className="h-10 w-full bg-neutral-100 rounded-tr-lg rounded-tl-lg flex justify-between px-10 md:px-6 py-2 bg-gradient-to-l from-primary via-green-500 to-emerald-500">
                <div className="font-medium text-sm flex items-center gap-2 text-white">
                  <NeonLogoWhite />
                </div>
                {messages.length > 0 && (
                  <motion.button
                    className="rounded-full bg-black text-white px-2 py-0.5 text-sm flex items-center justify-center gap-1 overflow-hidden"
                    onClick={() => setMessages([])}
                    whileHover="hover"
                    initial="initial"
                    animate="initial"
                    variants={{
                      initial: {
                        width: "4rem",
                      },
                      hover: {
                        width: "4rem",
                      },
                    }}
                  >
                    <motion.div
                      variants={{
                        initial: {
                          opacity: 0,
                          width: 0,
                        },
                        hover: {
                          opacity: 1,
                          width: "3.5rem",
                        },
                      }}
                    >
                      <IconPlus className="h-4 w-4 flex-shrink-0" />
                    </motion.div>
                    <motion.span>New</motion.span>
                  </motion.button>
                )}
              </div>
              {!messages.length && (
                <div className="px-5 py-10 grid grid-cols-1 md:grid-cols-2 gap-2  overflow-y-auto">
                  {blocks.map((block, index) => (
                    <motion.button
                      initial={{
                        opacity: 0,
                        filter: "blur(10px)",
                      }}
                      animate={{
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.3,
                        delay: 0.2 * index,
                      }}
                      key={block.title}
                      onClick={() => {
                        handleBlockClick(block.content);
                      }}
                      className="p-4 flex flex-col text-left justify-between rounded-2xl h-32 md:h-40 w-full bg-white"
                    >
                      {block.icon}
                      <div>
                        <div className="text-base font-bold text-black">
                          {block.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {block.content}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
              <div
                ref={messageHistoryRef}
                className="p-2 flex flex-1 overflow-y-auto"
              >
                <div className="flex flex-1 flex-col">
                  {messages.map((message) => (
                    <div key={message.id}>
                      {message.role === "user" ? (
                        <UserMessage content={message.content} />
                      ) : (
                        <>
                          <AIMessage content={message.content} />
                        </>
                      )}
                    </div>
                  ))}
                  <div className="pb-10" ref={messagesEndRef} />{" "}
                  {/* Add this div as scroll anchor */}
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="max-h-[10vh] py-1 px-5 relative"
              >
                {showScrollButton && (
                  <button
                    onClick={scrollIntoView}
                    className="absolute -top-10 left-1/2 -translate-x-1/2  h-8 w-8 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <IconArrowNarrowDown className="h-5 w-5" />
                  </button>
                )}
                <AnimatePresence>
                  {isLoading ? (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={stop}
                      className="absolute top-1/2 right-8 group -translate-y-1/2 bg-red-500 h-8 w-8 rounded-full flex items-center justify-center"
                    >
                      <IconPlayerStopFilled className="h-5 w-5 text-white group-hover:twhite group-hover:-translate-y-0.5 group-hover:rotate-12 transition duration-200" />
                    </motion.button>
                  ) : (
                    <button
                      type="submit"
                      className="absolute top-1/2 right-8 group -translate-y-1/2 bg-gray-100 h-8 w-8 rounded-full flex items-center justify-center"
                    >
                      <IconArrowNarrowUp className="h-5 w-5 text-neutral-500 group-hover:text-black group-hover:-translate-y-0.5 group-hover:rotate-12 transition duration-200" />
                    </button>
                  )}
                </AnimatePresence>
                <textarea
                  ref={inputRef}
                  disabled={disabled}
                  className={`px-4 w-full pr-10 rounded-lg border-[#f2f2f2] text-black border py-[1rem] bg-white text-sm  [box-sizing:border-box] overflow-x-auto    inline-block focus:outline-none  transition duration-100`}
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
                  style={{ resize: "none" }}
                  rows={1}
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <button
        onClick={() => {
          setOpen(!open);
        }}
        className={cn(
          "h-14 w-14 relative z-10  group bg-white flex  hover:bg-primary cursor-pointer items-center justify-center rounded-full shadow-derek transition duration-200",
          open ? "z-10" : "z-30"
        )}
      >
        <IconMessage className="h-6 w-6 text-neutral-600 group-hover:text-black" />
      </button>
    </div>
  );
};

const UserMessage = ({ content }: { content: string }) => {
  return (
    <div className="p-2 rounded-lg flex gap-2 items-start">
      <div className="h-8 w-8 rounded-full flex-shrink-0 bg-gradient-to-br from-pink-500 to-violet-600" />
      <div className="text-sm px-2 py-2 rounded-lg shadow-derek w-fit bg-white text-black">
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
      <div className="text-sm px-2 py-2 rounded-lg shadow-derek w-full bg-black text-white prose prose-sm prose-invert">
        <Markdown>{content}</Markdown>
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

const NeonLogoWhite = () => {
  return (
    <svg
      width="158"
      height="45"
      viewBox="0 0 158 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 7.61152C0 3.40779 3.44137 0 7.68651 0H36.8952C41.1404 0 44.5817 3.40779 44.5817 7.61152V32.2111C44.5817 36.5601 39.0241 38.4476 36.3287 35.014L27.902 24.2798V37.2964C27.902 41.0798 24.8048 44.1468 20.9842 44.1468H7.68651C3.44137 44.1468 0 40.739 0 36.5353V7.61152ZM7.68651 6.08921C6.83748 6.08921 6.14921 6.77077 6.14921 7.61152V36.5353C6.14921 37.376 6.83748 38.0576 7.68651 38.0576H21.2148C21.6393 38.0576 21.7528 37.7168 21.7528 37.2964V19.8412C21.7528 15.4922 27.3104 13.6047 30.0059 17.0383L38.4325 27.7725V7.61152C38.4325 6.77077 38.5129 6.08921 37.6639 6.08921H7.68651Z"
        fill="white"
      />
      <path
        d="M36.8954 0C41.1406 0 44.5819 3.40779 44.5819 7.61152V32.2111C44.5819 36.5601 39.0243 38.4476 36.3289 35.014L27.9022 24.2798V37.2964C27.9022 41.0798 24.805 44.1468 20.9844 44.1468C21.4089 44.1468 21.753 43.806 21.753 43.3857V19.8412C21.753 15.4922 27.3106 13.6047 30.0061 17.0383L38.4327 27.7725V1.5223C38.4327 0.681558 37.7445 0 36.8954 0Z"
        fill="white"
      />
      <path
        d="M75.1561 13.0033V24.5502L63.8496 13.0033H57.9648V31.8884H63.332V19.4782L75.6465 31.8884H80.5232V13.0033H75.1561Z"
        fill="white"
      />
      <path
        d="M90.4725 27.6797V24.3343H102.487V20.3145H90.4725V17.212H105.048V13.0033H84.9964V31.8884H105.348V27.6797H90.4725Z"
        fill="white"
      />
      <path
        d="M119.61 32.5089C127.157 32.5089 132.061 28.8398 132.061 22.4458C132.061 16.0519 127.157 12.3828 119.61 12.3828C112.063 12.3828 107.187 16.0519 107.187 22.4458C107.187 28.8398 112.063 32.5089 119.61 32.5089ZM119.61 28.0304C115.415 28.0304 112.826 26.007 112.826 22.4458C112.826 18.8847 115.442 16.8613 119.61 16.8613C123.806 16.8613 126.394 18.8847 126.394 22.4458C126.394 26.007 123.806 28.0304 119.61 28.0304Z"
        fill="white"
      />
      <path
        d="M152.632 13.0033V24.5502L141.326 13.0033H135.441V31.8884H140.808V19.4782L153.123 31.8884H157.999V13.0033H152.632Z"
        fill="white"
      />
    </svg>
  );
};
