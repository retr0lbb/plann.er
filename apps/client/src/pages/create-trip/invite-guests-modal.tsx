import { AtSign, Frown, Plus, X } from "lucide-react"
import { FormEvent } from "react"
import { Button } from "../../components/button"
import { Modal } from "../../components/modal"
import { AnimatePresence, motion } from "framer-motion"


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
            <AnimatePresence>
            {emailsToInvite.map((email) => {
              return(
                <motion.div 
                  key={email} 
                  className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2"
                  initial={{
                    opacity: 0,
                    y: 100
                  }}
                  animate={{
                    opacity: 1,
                    y:0
                  }}
                  exit={{
                    scale: 0,
                    opacity: 0,
                    rotateY: 12,
                    rotateX: 32,
                  }}
                >
                  <span className="text-zinc-300">{email}</span> <button type="button" onClick={() => removeEmailFromList(email)}><X className="size-4"/></button>
                </motion.div>
              )
          })}
          {emailsToInvite.length === 0 && (
            <div className="flex items-center justify-center gap-2 w-full p-5">
              <Frown size={32} className="text-zinc-600" />
              <p className="text-zinc-600 text-lg text-center">Não há pessoas convidadas para essa viagem</p>
            </div>
          )}
          </AnimatePresence>

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