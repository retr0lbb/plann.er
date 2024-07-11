import { ArrowRight, UserRoundPlus } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";

export function CreateTripPage() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
  const navigate = useNavigate()

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }
  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }
  function OpenGuestsModal(){
    setIsGuestsModalOpen(true)
  }
  function CloseGuestsModal(){
    setIsGuestsModalOpen(false)
  }
  function OpenIsConfirmTripModal(){
    setIsConfirmTripModalOpen(true)
  }
  function CloseIsConfirmTripModal(){
    setIsConfirmTripModalOpen(false)
  }
  function addNewEmailToInvite(e: FormEvent<HTMLFormElement>){
    e.preventDefault();

    const data = new FormData(e.currentTarget)
    const email = data.get("email")?.toString()
    if(!email){
      return
    }

    if(emailsToInvite.includes(email)){
      return
    }
    setEmailsToInvite(prev => [...prev, email])

    e.currentTarget.reset()
  }

  function removeEmailFromList(email: string){
    setEmailsToInvite(prev => prev.filter(prevEmail => prevEmail !== email))
  }
  function createTrip(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    navigate("/trips/123")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-2">
          <img src='/Logo.svg' alt="Planner" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua proxima viagem!
          </p>
        </div>


        <div className="space-y-4">
        
        <DestinationAndDateStep 
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
        />


        {isGuestsInputOpen && (
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
        )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda<br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a className="text-zinc-300 underline" href="#"> políticas de privacidade</a>.
        </p>
      </div>


      {isGuestsModalOpen && <InviteGuestsModal 
                                CloseGuestsModal={CloseGuestsModal} 
                                addNewEmailToInvite={addNewEmailToInvite} 
                                emailsToInvite={emailsToInvite} 
                                removeEmailFromList={removeEmailFromList} 
                            />}


      {/* modalda3 */}

      {isConfirmTripModalOpen && <ConfirmTripModal 
                                    CloseIsConfirmTripModal={CloseIsConfirmTripModal} 
                                    createTrip={createTrip} 
                                />}
    </div>
  );
}
