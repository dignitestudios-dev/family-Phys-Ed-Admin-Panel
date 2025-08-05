"use client";

import MessageBox from "@/components/MessageBox";
import { utils } from "@/lib/utils";
import { SendHorizontal } from "lucide-react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState, Suspense } from "react";
import {
  listenSupportChats,
  listenSupportChatMessages,
  sendSupportMessage,
  updateSupportSeenStatus,
} from "@/lib/supportChatService";

// TODO: Replace with actual admin UID (from auth/session)
const ChatSupport = () => {
  const [adminUid, setAdminUid] = useState<string | null>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const lastMsgRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const adminData = Cookies.get("admin");
    if (adminData) {
      const parsedAdmin = JSON.parse(adminData);
      console.log("parsedAdmin: ", parsedAdmin);
      setAdminUid(parsedAdmin.uid);
    }
  }, []);

  // Listen to all support chats
  // Only auto-select first chat on initial load, or select by chatId from query param
  const initialChatSelected = useRef(false);
  useEffect(() => {
    if (!adminUid) return;
    setLoadingChats(true);
    const chatIdFromQuery = searchParams.get("chatId");
    const unsub = listenSupportChats(adminUid, (data: any[]) => {
      const sorted = data.sort(
        (a, b) => (b.created_at?.seconds || 0) - (a.created_at?.seconds || 0)
      );
      setChats(sorted);
      if (!initialChatSelected.current && sorted.length > 0) {
        if (chatIdFromQuery) {
          const found = sorted.find((c) => c.id === chatIdFromQuery);
          if (found) setSelectedChat(found);
          else setSelectedChat(sorted[0]);
        } else {
          setSelectedChat(sorted[0]);
        }
        initialChatSelected.current = true;
      }
      setLoadingChats(false);
    });
    return () => {
      unsub();
      initialChatSelected.current = false;
    };
    // eslint-disable-next-line
  }, [adminUid, searchParams]);

  // Listen to messages of selected chat
  useEffect(() => {
    if (!selectedChat || !adminUid) return;
    setLoadingMessages(true);
    const unsub = listenSupportChatMessages(selectedChat.id, (msgs: any[]) => {
      setMessages(msgs);
      setLoadingMessages(false);
      // Mark as seen for admin
      updateSupportSeenStatus(selectedChat.id, adminUid);
    });
    return () => {
      unsub();
      setMessages([]);
      setLoadingMessages(false);
    };
  }, [selectedChat, adminUid]);

  // Scroll to last message
  useEffect(() => {
    setTimeout(() => {
      lastMsgRef.current?.scrollIntoView();
    }, 0);
  }, [messages]);

  // Send message handler
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedChat || !adminUid) return;

    const newMessage = message;
    setMessage("");

    try {
      await sendSupportMessage(
        selectedChat.id,
        { msg: message, type: "text" },
        selectedChat.profile?.uid,
        adminUid
      );
      setMessage("");
    } catch (error) {
      console.log(error);
      setMessage(newMessage);
    }
  };

  return (
    <>
      <h2 className="section-heading mb-4">Chat Support</h2>
      <div className="grid grid-cols-7 h-full overflow-y-auto hidden-scrollbar gap-5">
        {/* Chat List */}
        <div className="col-span-2 bg-secondary rounded-2xl p-2 overflow-y-auto hidden-scrollbar">
          {loadingChats ? (
            <>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-2xl py-2 px-3 flex justify-between items-start gap-5 mb-2 bg-[#232325]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-[2px] bg-gradient rounded-full">
                      <div className="h-[43px] w-[43px] rounded-full bg-[#333]" />
                    </div>
                    <div>
                      <div className="h-4 w-24 bg-[#333] rounded mb-2" />
                      <div className="h-3 w-32 bg-[#333] rounded" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="h-3 w-10 bg-[#333] rounded mb-2" />
                    <div className="h-5 w-5 bg-[#333] rounded-full" />
                  </div>
                </div>
              ))}
            </>
          ) : chats.length === 0 ? (
            <div className="text-center text-white/60 mt-10">
              No conversations yet.
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                className={`cursor-pointer rounded-2xl py-2 px-3 flex justify-between items-start gap-5 mb-2 ${
                  selectedChat?.id === chat.id
                    ? "bg-[#2c2c2e]"
                    : "hover:bg-[#232325]"
                }`}
                onClick={() => setSelectedChat(chat)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-[2px] bg-gradient rounded-full">
                    <div
                      className="h-[43px] w-[43px] rounded-full bg-cover bg-center border-2 border-[#1C1C1E]"
                      style={{
                        backgroundImage: chat.profile.avatar
                          ? `url(${process.env.NEXT_PUBLIC_MEDIA_URL}${chat.profile.avatar})`
                          : "/default-avatar.png",
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {chat.profile?.name || "Unknown"}
                    </p>
                    <p className="text-sm mt-2 truncate max-w-[120px]">
                      {chat.last_msg || "No messages yet."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-sm text-white/50">
                    {chat.created_at?.seconds
                      ? utils.formatRelativeTime(
                          new Date(chat.created_at.seconds * 1000).toISOString()
                        )
                      : ""}
                  </p>
                  {adminUid && chat.unseen_counts?.[adminUid] > 0 && (
                    <div className="text-sm font-semibold text-black bg-white h-5 w-5 rounded-full flex justify-center items-center">
                      {chat.unseen_counts[adminUid]}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat Messages */}
        <div className="relative flex flex-col w-full col-span-5 bg-secondary rounded-2xl p-2 overflow-y-auto hidden-scrollbar">
          {selectedChat && (
            <>
              <div
                className={`bg-[#2c2c2e] rounded-t-2xl py-2 px-3 flex justify-between items-start gap-5`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-[2px] bg-gradient rounded-full">
                    <div
                      className="h-[43px] w-[43px] rounded-full bg-cover bg-center border-2 border-[#1C1C1E]"
                      style={{
                        backgroundImage: selectedChat.profile.avatar
                          ? `url(${process.env.NEXT_PUBLIC_MEDIA_URL}${selectedChat.profile.avatar})`
                          : "/default-avatar.png",
                      }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">
                      {selectedChat.profile?.name || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-2 mb-22 flex-1 flex flex-col overflow-y-auto hidden-scrollbar h-full">
                {loadingMessages ? (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`flex ${
                          i % 2 === 0 ? "justify-start" : "justify-end"
                        } mb-3`}
                      >
                        <div
                          className={`w-2/3 max-w-[85%] py-2 px-3 rounded-lg bg-[#333] animate-pulse`}
                          style={{ minHeight: 32 }}
                        />
                      </div>
                    ))}
                  </>
                ) : messages.length === 0 ? (
                  <div className="text-center text-white/60 mt-10">
                    No messages yet.
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <MessageBox
                      key={msg.id}
                      ref={idx === messages.length - 1 ? lastMsgRef : null}
                      isMine={msg.uid === adminUid}
                      text={msg.msg}
                      time={
                        msg.timestamp?.seconds
                          ? new Date(msg.timestamp.seconds * 1000).toISOString()
                          : ""
                      }
                    />
                  ))
                )}
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
            </>
          )}
          {!selectedChat && (
            <div className="flex-1 flex items-center justify-center text-white/60">
              Select a conversation to view messages.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default function ChatSupportPage() {
  return (
    <Suspense fallback={<div>Loading chat support...</div>}>
      <ChatSupport />
    </Suspense>
  );
}
