import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";

interface InviteGuestsStepProps{
    OpenGuestsModal: () => void
    emailsToInvite: string[]
    openConfirmTripModal: () => void
}

export function InviteGuestsStep({ openConfirmTripModal, emailsToInvite, OpenGuestsModal}: InviteGuestsStepProps){
    return(
        <div className="h-16 px-4 bg-zinc-900 rounded-xl overflow-hidden flex items-center shadow-shape gap-3">
        <button type="button" onClick={() => OpenGuestsModal()} className="flex items-center gap-2 flex-1 text-left">
          <UserRoundPlus className="size-5 text-zinc-400" />
          {emailsToInvite.length >0? (
            <span className="text-zinc-100 flex-1 text-lg">{emailsToInvite.length} pessoa(s) convidada(s)</span>
          ) : (
            <span className="text-zinc-400 flex-1 text-lg">Quem estará na viagem?</span>
          )}
        </button>
      <Button
        onClick={() => {openConfirmTripModal()}}
      > 
        Confirmar viagem
        <ArrowRight className="text-lime-950 size-5" />
      </Button>
    </div>
    )
}