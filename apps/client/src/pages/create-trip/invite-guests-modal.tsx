import { AtSign, Plus, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import { Modal } from "../../components/modal"


interface InviteGuestsModalProps {
  CloseGuestsModal: () => void
  emailsToInvite: string[]
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  removeEmailFromList: (email: string) => void
}

export function InviteGuestsModal({CloseGuestsModal, addNewEmailToInvite, emailsToInvite, removeEmailFromList}: InviteGuestsModalProps){
    return(

      <Modal
        title="Selecionar convidados"
        description="Os convidados irão receber e-mails para confirmar a participação na viagem."
        onCloseModal={CloseGuestsModal}
        size="lg"
      >
        <div className="flex flex-wrap gap-2">
            
            {emailsToInvite.map((email) => {
              return(
                <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
                  <span className="text-zinc-300">{email}</span> <button type="button" onClick={() => removeEmailFromList(email)}><X className="size-4"/></button>
                </div>
              )
          })}

          </div>

          <div className="w-full h-px bg-zinc-800" />

          <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-900 rounded-lg flex items-center gap-2">
            <div className="px-2 flex items-center flex-1 gap-2">
              <AtSign className="text-zinc-400 size-5" />
              <input
                type="email"
                name="email"
                placeholder= "Digite o e-mail do convidado"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />  
            </div>

            <Button
              variant="primary"
              type="submit"
            >
              Convidar
              <Plus className="text-lime-950 size-5" />
            </Button>
          </form>

      </Modal>
        
    )
}