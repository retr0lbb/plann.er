import { useParams } from "react-router-dom";
import { Modal } from "../../components/modal";
import { Participants } from "./guest-list";
import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { AtSign, CheckCircle2, CircleDashed, Plus, Trash2 } from "lucide-react";
import { Input } from "../../components/input";
import { Button } from "../../components/button";


export function InviteOrRemoveParticipantsModal({onCloseModal}: {onCloseModal: ()=>void}){
    const {tripId} = useParams()
    const [participants, setParticipants] = useState<Participants[]>([])
    const [possibleParticipantEmail, setPossibleParticipantEmail] = useState("")

    useEffect(()=> {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId])


    async function inviteParticipant(){
        if(possibleParticipantEmail.length <= 0){
            return
        }

        await api.post(`/trips/${tripId}/invite`, {
            email: possibleParticipantEmail
        })

        window.document.location.reload()
    }

    return(
        <Modal
          title="Gerenciar Participantes"
          description="Adicione ou remova participantes de uma viagem."
          size="none"
          onCloseModal={onCloseModal}
        >
            <div className="space-y-3.5">
            {participants.map((participant, index) => {
                return(
                    <div key={participant.id} className="flex items-center justify-between gap-4 bg-zinc-800 py-2 px-6 rounded-lg">
                        <div className="space-y-1.5">
                            <span className="block font-medium text-zinc-100">{participant.name ?? `Participant ${index}`}</span>
                            <span className="block text-xm text-zinc-400 text-sm truncate">
                                {participant.email}
                            </span>
                        </div>
                        {participant.is_confirmed ? (
                            <div className="flex items-center justify-center gap-2">
                                <CheckCircle2 className="size-5 shrink-0 text-green-400" />
                                <Trash2 className="text-zinc-500 cursor-pointer" />
                            </div>
                        ): (
                            <div className="flex items-center justify-center gap-2">
                                <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                                <Trash2 className="text-zinc-500 cursor-pointer" />
                            </div>
                        )}
                    </div>
                )
            })}
            </div>

            <div className="w-full h-px bg-zinc-800" />

            <div className="space-y-3.5">
                <Input
                  value={possibleParticipantEmail}
                  onChange={(e) => setPossibleParticipantEmail(e.target.value)}
                  variation="secondary"
                  name="guest_email"
                  inputMode="email"
                  placeholder="Digite o e-mail do convidado"
                >
                    <AtSign size={20} className="text-zinc-500" />
                </Input>
                
                <Button
                  onClick={() => inviteParticipant()}
                  variant="primary"
                  size="full"
                >
                    <Plus />
                    Convidar
                </Button>
            </div>
        </Modal>
    )
}