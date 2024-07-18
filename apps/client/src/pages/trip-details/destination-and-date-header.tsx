import { Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { dayjs } from "../../lib/dayjs-config";


export interface TripDetails{
    destination: string 
    ends_at: string
    id: string
    is_confirmed: boolean
    starts_at: string
}


export function DestinationAndDateHeader(){

    const {tripId} = useParams()
    const [trip, setTrip] = useState<TripDetails | undefined>()

    useEffect(()=> {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.tripDetails))
    }, [tripId])

    const startDisplayDate = dayjs(trip?.starts_at).format("DD MMM")
    const endDisplayDate = dayjs(trip?.ends_at).format("DD MMM")

    const displayedDate = trip?.starts_at !== undefined ? `${startDisplayDate} até ${endDisplayDate}` : null
    

    return(
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400"/>
                <span className="text-zinc-100">{trip?.destination}</span>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400"/>
                    <span className="text-zinc-100">{displayedDate}</span>
                </div>
                <div className="w-px h-6 bg-zinc-800" />
                <Button variant="secondary">
                    Alterar local/data
                    <Settings2 className="size-5"/>
                </Button>
            </div>
        </div>
    )
}