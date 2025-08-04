"use client";
import MessageBox from "@/components/MessageBox";
import { postHooks } from "@/hooks/usePostRequests";
import { utils } from "@/lib/utils";
import { SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

const ChatSupport = () => {
  const { message, setMessage, handleSendMessage } = postHooks.useSendMessage();
  const lastMsgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMsgRef.current?.scrollIntoView();
    }, 0);
  }, [message]);

  return (
    <>
      <h2 className="section-heading mb-4">Chat Support</h2>

      <div className="grid grid-cols-7 h-full overflow-y-auto hidden-scrollbar gap-5">
        <div className="col-span-2 bg-secondary rounded-2xl p-2 overflow-y-auto hidden-scrollbar">
          {/* Conversation */}
          <div
            className={`${
              true && "bg-[#2c2c2e]"
            } rounded-2xl py-2 px-3 flex justify-between items-start gap-5`}
          >
            <div className="flex items-center gap-3">
              <div className="p-[2px] bg-gradient rounded-full">
                <div
                  className="h-[43px] w-[43px] rounded-full bg-cover bg-center border-2 border-[#1C1C1E]"
                  style={{
                    backgroundImage: `url(${"/default-avatar.png"})`,
                  }}
                />
              </div>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm mt-2">Hello, this is a message.</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <p className="text-sm text-white/50">
                {utils.formatRelativeTime(String(new Date()))}
              </p>
              <div className="text-sm font-semibold text-black bg-white h-5 w-5 rounded-full flex justify-center items-center">
                5
              </div>
            </div>
          </div>
          <div
            className={`${
              false && "bg-[#2c2c2e]"
            } rounded-2xl py-2 px-3 flex justify-between items-start gap-5`}
          >
            <div className="flex items-center gap-3">
              <div className="p-[2px] bg-gradient rounded-full">
                <div
                  className="h-[43px] w-[43px] rounded-full bg-cover bg-center border-2 border-[#1C1C1E]"
                  style={{
                    backgroundImage: `url(${"/default-avatar.png"})`,
                  }}
                />
              </div>
              <div>
                <p className="font-semibold">John Doe</p>
                <p className="text-sm mt-2">Hello, this is a message.</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <p className="text-sm text-white/50">
                {/* {utils.formatRelativeTime(String(new Date()))} */}2 mins ago
              </p>
              {/* <div className="text-sm font-semibold text-black bg-white h-5 w-5 rounded-full flex justify-center items-center">
                5
              </div> */}
            </div>
          </div>
        </div>
        <div className="relative flex flex-col w-full col-span-5 bg-secondary rounded-2xl p-2 overflow-y-auto hidden-scrollbar">
          <div
            className={`bg-[#2c2c2e] rounded-t-2xl py-2 px-3 flex justify-between items-start gap-5`}
          >
            <div className="flex items-center gap-3">
              <div className="p-[2px] bg-gradient rounded-full">
                <div
                  className="h-[43px] w-[43px] rounded-full bg-cover bg-center border-2 border-[#1C1C1E]"
                  style={{
                    backgroundImage: `url(${"/default-avatar.png"})`,
                  }}
                />
              </div>
              <div>
                <p className="font-semibold text-lg">John Doe</p>
              </div>
            </div>
          </div>

          <div className="mt-2 mb-22 flex-1 flex flex-col overflow-y-auto hidden-scrollbar h-full">
            <MessageBox
              isMine={false}
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              }
              time={String(new Date())}
            />
            <MessageBox
              isMine={true}
              text={"Lorem Ipsum is simply dummy textand typesetting industry."}
              time={String(new Date())}
            />
            <MessageBox
              isMine={true}
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. printing and typesetting industry"
              }
              time={String(new Date())}
            />
            <MessageBox
              isMine={false}
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              }
              time={String(new Date())}
            />
            <MessageBox
              isMine={true}
              text={"Lorem Ipsum is simply dummy textand typesetting industry."}
              time={String(new Date())}
            />
            <MessageBox
              isMine={true}
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. printing and typesetting industry"
              }
              time={String(new Date())}
            />
            <MessageBox
              isMine={false}
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              }
              time={String(new Date())}
            />
            <MessageBox
              isMine={true}
              text={"Lorem Ipsum is simply dummy textand typesetting industry."}
              time={String(new Date())}
            />
            <MessageBox
              isMine={true}
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. printing and typesetting industry"
              }
              time={String(new Date())}
            />
            <MessageBox
              isMine={false}
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              }
              time={String(new Date())}
            />
            <MessageBox
              isMine={true}
              text={"Lorem Ipsum is simply dummy textand typesetting industry."}
              time={String(new Date())}
            />
            <MessageBox
              isMine={true}
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. printing and typesetting industry"
              }
              time={String(new Date())}
            />
            <MessageBox
              isMine={false}
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              }
              time={String(new Date())}
            />
            <MessageBox
              isMine={true}
              text={"Lorem Ipsum is simply dummy textand typesetting industry."}
              time={String(new Date())}
            />
            <MessageBox
              ref={true ? lastMsgRef : null}
              isMine={true}
              text={
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. printing and typesetting industry"
              }
              time={String(new Date())}
            />
          </div>

          {/* Message Input */}
          <div className="p-2 absolute bottom-0 left-0 w-full bg-transparent">
            <form
              className="bg-[#2C2C2E] p-5 rounded-b-2xl flex gap-4 items-center h-full w-full"
              onSubmit={handleSendMessage}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="indent-2 text-xs w-full rounded-lg border-2 border-primary h-12 outline-none"
              />
              <button
                type="submit"
                className="h-10 w-10 flex justify-center items-center bg-gradient rounded-full"
              >
                <SendHorizontal color="#282828" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSupport;
