import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { DateRange } from "react-day-picker";
import { api } from "../../lib/axios";

export function CreateTripPage() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName]  = useState("");
  const [ownerEmail, setOwnerEmail]  = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();  



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
  async function createTrip(e: FormEvent<HTMLFormElement>){
    e.preventDefault()

    console.log(destination)
    console.log(ownerEmail)
    console.log(ownerName)
    console.log(emailsToInvite)
    console.log(eventStartAndEndDates)

    if(eventStartAndEndDates?.from ===   undefined || eventStartAndEndDates.to === undefined  ){
      return
    }
    if(!destination){
      return
    }
    if(!ownerEmail || !ownerName){
      return
    }
    if(emailsToInvite.length === 0){
      return
    }

    const response = await api.post('/trips', {
        destination: destination,
        starts_at: eventStartAndEndDates.from,
        ends_at: eventStartAndEndDates.to,
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail
    })

    const {data} = response.data

    navigate(`/trips/${data}`)
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
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
            setDestination={setDestination}
            closeGuestsInput={closeGuestsInput}
            isGuestsInputOpen={isGuestsInputOpen}
            openGuestsInput={openGuestsInput}
        />


        {isGuestsInputOpen && <InviteGuestsStep 
                                  OpenGuestsModal={OpenGuestsModal} 
                                  OpenIsConfirmTripModal={OpenIsConfirmTripModal} 
                                  emailsToInvite={emailsToInvite}
                                />}
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
                                    setOwnerName={setOwnerName}
                                    setOwnerEmail={setOwnerEmail}
                                    CloseIsConfirmTripModal={CloseIsConfirmTripModal} 
                                    createTrip={createTrip} 
                                />}
    </div>
  );
}
