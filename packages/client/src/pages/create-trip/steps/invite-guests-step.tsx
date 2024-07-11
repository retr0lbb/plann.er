import { ArrowRight, UserRoundPlus } from "lucide-react";

interface InviteGuestsStepProps{
    OpenGuestsModal: () => void
    emailsToInvite: string[]
    OpenIsConfirmTripModal: () => void
}

export function InviteGuestsStep({OpenGuestsModal, OpenIsConfirmTripModal, emailsToInvite}: InviteGuestsStepProps){
    return(
        <div className="h-16 px-4 bg-zinc-900 rounded-xl overflow-hidden flex items-center shadow-shape gap-3">
        <button type="button" onClick={OpenGuestsModal} className="flex items-center gap-2 flex-1 text-left">
          <UserRoundPlus className="size-5 text-zinc-400" />
          {emailsToInvite.length >0? (
            <span className="text-zinc-100 flex-1 text-lg">{emailsToInvite.length} pessoa(s) convidada(s)</span>
          ) : (
            <span className="text-zinc-400 flex-1 text-lg">Quem estará na viagem?</span>
          )}
        </button>
      <button
        onClick={OpenIsConfirmTripModal}
        className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-semibold flex items-center gap-2 hover:bg-lime-400"
      >
        Confirmar viagem
        <ArrowRight className="text-lime-950 size-5" />
      </button>
    </div>
    )
}