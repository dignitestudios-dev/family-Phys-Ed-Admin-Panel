
function Details({ fitness_goal, activity_preferences, fitness_level }: { fitness_goal: string, activity_preferences: any[], fitness_level: string }) {
    return (
        <div className="flex flex-col gap-4" >
            <div className="bg-secondary p-5 rounded-2xl" >
                <h1 className="text-white font-bold text-2xl" >Fitness Goal</h1>
                <div className="flex flex-wrap text-white" >
                { fitness_goal}
                </div>
            </div>
            <div className="bg-secondary p-5 rounded-2xl" >
                <h1 className="text-white font-bold text-2xl mb-4">Activity Preferences</h1>
                <div className="flex flex-wrap gap-4">
                {activity_preferences.map((act , idx)=>(
                    <div className="text-white w-[25%] text-center bg-[#2a2a2b] p-2 rounded-xl" key={idx} >{act}</div>
                ))}
                </div>
            </div>
            <div className="bg-secondary p-5 rounded-2xl" >
                <h1 className="text-white font-bold text-2xl mb-4">Fitness Level</h1>
                <div className="text-white w-[25%] text-center bg-[#2a2a2b] p-2 rounded-xl" >  { fitness_level}</div>
              
            </div>
        </div>
    )
}

export default Details