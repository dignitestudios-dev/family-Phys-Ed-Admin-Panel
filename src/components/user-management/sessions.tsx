import { ISessions } from "@/lib/types";
import { useState } from "react";
import SessionCard from "../ui/session-card";
import Image from "next/image";
import { usePathname } from "next/navigation";

const tabOptions = ["public", "private", "custom"] as const;
type TabType = (typeof tabOptions)[number];

const Sessions = ({
  sessions,
  coachId,
}: {
  sessions: ISessions;
  coachId: string;
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("public");
  const pathname = usePathname();

  const currentData = sessions[activeTab];
  return (
    <div className="relative">
      <div className="flex gap-4 mb-4 absolute -top-9 bg-[#2C2C2E] left-4 rounded-xl z-20">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 z-10 rounded ${
              activeTab === tab
                ? "bg-transparent border-b-4 text-primary"
                : "bg-transparent text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="mt-12 p-4 rounded bg-secondary text-white shadow">
        {currentData.data.length === 0 || pathname.includes("requests") ? (
          <div className="text-gray-500 mt-2 flex justify-center flex-col items-center">
            <Image
              src={`/images/no-session.png`}
              alt="no"
              width={300}
              height={300}
            />
            <h1 className="text-white">No sessions available</h1>
            {pathname.includes("requests") && (
              <h3 className="text-xs">
                The user will be able to create sessions once you approve their
                profile
              </h3>
            )}
          </div>
        ) : (
          <ul className="mt-2 space-y-2">
            {currentData.data.map((session, index) => (
              <SessionCard session={session} key={index} coachId={coachId} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sessions;
