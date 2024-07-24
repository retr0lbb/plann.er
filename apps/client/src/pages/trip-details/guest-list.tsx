import { CheckCircle2, CircleDashed, UserCog } from "lucide-react"
import { Button } from "../../components/button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"


export interface Participants{
    id: string
    name: string | null,
    email: string,
    is_confirmed: boolean
}


export function GuestList({openManageParticipantsModal}: {openManageParticipantsModal: ()=> void}){
    const {tripId} = useParams()
    const [participants, setParticipants] = useState<Participants[]>([])

    useEffect(()=> {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId])
    return(
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Convidados</h2>
                <div className="space-y-5">


                    {participants.map((participant, index) => {
                        return(
                            <div key={participant.id} className="flex items-center justify-between gap-4">
                                <div className="space-y-1.5">
                                    <span className="block font-medium text-zinc-100">{participant.name ?? `Participant ${index}`}</span>
                                    <span className="block text-xm text-zinc-400 text-sm truncate">
                                        {participant.email}
                                    </span>
                                </div>
                                {participant.is_confirmed ? (
                                    <CheckCircle2 className="size-5 shrink-0 text-green-400" />
                                ): (
                                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                                )}
                            </div>
                        )
                    })}
                
                </div>

            <Button onClick={openManageParticipantsModal} size="full" variant="secondary">
                <UserCog className="text-zinc-200 size-5" />
                Gerenciar convidados
            </Button>
        </div>
    )
}