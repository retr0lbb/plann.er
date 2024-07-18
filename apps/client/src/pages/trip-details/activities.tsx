import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import {dayjs} from "../../lib/dayjs-config";

interface Activity{
    date: string,
    activities: {
        id: string,
        title: string,
        occurs_at: string
    }[]
}

export function Activities(){

    const {tripId} = useParams()
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(()=> {
        api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
    }, [tripId])
    return(
        <div className="space-y-8">

            {activities.map(activity => {
                return(
                <div key={activity.date} className="space-y-2.5">
                    <div className="flex gap-2 items-baseline">
                        <span className="text-xl text-zinc-300 font-semibold">Dia {dayjs(activity.date).format("D")}</span>
                        <span className="text-xs text-zinc-500">{dayjs(activity.date).format("dddd").replace("-feira", "")}</span>
                    </div>
                    {activity.activities.length <= 0? (
                        <p className="text-sm text-zinc-500">Nenhuma atividade cadastrada nessa data.</p>
                    ) : (
                        activity.activities.map(atv => {
                                return(
                                    <div key={atv.id} className="space-y-2.5">
                                        <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                            <CircleCheck className="size-5 text-lime-300" />
                                            <span className="text-zinc-100">{atv.title}</span>
                                            <span className="text-zinc-400 text-sm ml-auto">{dayjs(atv.occurs_at).format("HH:mm'h'")}h</span>
                                        </div>
                                    </div>
                                )
                            })
                    )}
                    
                </div>
                )
            })}

        </div>
    )
}