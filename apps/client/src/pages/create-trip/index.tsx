import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InviteGuestsModal } from "./invite-guests-modal";
import { ConfirmTripModal } from "./confirm-trip-modal";
import { DestinationAndDateStep } from "./steps/destination-and-date-step";
import { InviteGuestsStep } from "./steps/invite-guests-step";
import { api } from "../../lib/axios";
import { DateValue, RangeValue } from "@nextui-org/react";
import dayjs from "dayjs";
import { getLocalTimeZone } from "@internationalized/date";

enum MODAL{
  NONE = 0,
  GUEST = 1,
  CONFIRM_TRIP = 2
}

export function CreateTripPage() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  const [showModal, setShowModal] = useState(MODAL.NONE)

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName]  = useState("");
  const [ownerEmail, setOwnerEmail]  = useState("");
  const [startsAndEndDate, setStartsAndEndDate] = useState<RangeValue<DateValue>>() 



  const navigate = useNavigate()

  //modalHandler
  function setModalToGuestModal(){
    setShowModal(MODAL.GUEST)
  }

  function setModalToNone(){
    setShowModal(MODAL.NONE)
  }
  function openConfirmTripModal(){
    setShowModal(MODAL.CONFIRM_TRIP)
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
    console.log(dayjs(startsAndEndDate?.start.toDate(getLocalTimeZone())).toISOString())

    if(startsAndEndDate?.end === undefined || startsAndEndDate.start === undefined || !startsAndEndDate){
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
        starts_at: dayjs(startsAndEndDate.start.toDate(getLocalTimeZone())).toISOString(),
        ends_at: dayjs(startsAndEndDate.end.toDate(getLocalTimeZone())).toISOString(),
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail
    })

    const {data} = response.data

    console.log(dayjs(startsAndEndDate.start.toDate(getLocalTimeZone())).toISOString())
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
            openGuestsInput={()=> setIsGuestsInputOpen(true)}
            closeGuestsInput={()=> setIsGuestsInputOpen(false)}
            eventStartAndEndDates={startsAndEndDate}
            setEventStartAndEndDates={setStartsAndEndDate}
            setDestination={setDestination}
            isGuestsInputOpen={isGuestsInputOpen}

        />


        {isGuestsInputOpen && <InviteGuestsStep
                                  OpenGuestsModal={setModalToGuestModal}
                                  openConfirmTripModal={openConfirmTripModal}
                                  emailsToInvite={emailsToInvite}
                                />}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda<br />
          com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a className="text-zinc-300 underline" href="#"> políticas de privacidade</a>.
        </p>
      </div>


      {showModal === MODAL.GUEST 

        && (
          <InviteGuestsModal
            CloseGuestsModal={setModalToNone}
            addNewEmailToInvite={addNewEmailToInvite} 
            emailsToInvite={emailsToInvite} 
            removeEmailFromList={removeEmailFromList} 
          />
        )


}


      {/* modalda3 */}

      {showModal === MODAL.CONFIRM_TRIP && <ConfirmTripModal
                                    CloseIsConfirmTripModal={setModalToNone}
                                    setOwnerName={setOwnerName}
                                    setOwnerEmail={setOwnerEmail}
                                    createTrip={createTrip} 
                                />}
    </div>
  );
}
