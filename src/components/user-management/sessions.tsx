import { ISessions } from "@/lib/types"
import { useState } from "react";
import SessionCard from "../ui/session-card";

const tabOptions = ['public', 'private', 'custom'] as const;
type TabType = typeof tabOptions[number];

const Sessions = ({sessions}:{sessions:ISessions}) => {
      const [activeTab, setActiveTab] = useState<TabType>('public');

  const currentData = sessions[activeTab];
  return (
    <div className="relative">
    <div className="flex gap-4 mb-4 absolute -top-9 bg-[#2C2C2E] left-4 rounded-xl z-20">
        {tabOptions.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 z-10 rounded ${
              activeTab === tab ? 'bg-transparent border-b-4 text-primary' : 'bg-transparent text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} 
          </button>
        ))}
      </div>
        <div className="mt-12 p-4 rounded bg-secondary text-white shadow">
      
        {currentData.data.length === 0 ? (
          <p className="text-gray-500 mt-2">No sessions found.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {currentData.data.map((session, index) => (
             <SessionCard session={session} key={index}/>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Sessions