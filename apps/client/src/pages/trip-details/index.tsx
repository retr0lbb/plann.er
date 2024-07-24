import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { GuestList } from "./guest-list";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { CreateLinkModal } from "./create-link-modal";
import { InviteOrRemoveParticipantsModal } from "./invite-remove-participants-modal";


enum MODAL{
    NONE = 0,
    CREATE_ACTIVITY = 1,
    CREATE_LINKS = 2,
    MANAGE_PARTICIPANTS = 3
}

export function TripDetailsPage(){
    const [showModal, setShowModal] = useState(MODAL.NONE)

    function openCreateLinkModal(){
        setShowModal(MODAL.CREATE_LINKS)
    }
    function openManageParticipantsModal(){
        setShowModal(MODAL.MANAGE_PARTICIPANTS)
    }

    return(
        <div className="max-w-6xl min-h-screen px-6 py-10 mx-auto space-y-8">

            <DestinationAndDateHeader  handleEditTripDetails={()=>{}}/>

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>
                         
                        <Button
                            onClick={() => setShowModal(MODAL.CREATE_ACTIVITY)}
                        >
                                <Plus className="text-lime-950 size-5" />
                                Cadastrar atividade
                        </Button>
                    </div>

                    <Activities />
                </div>

                <div className="w-80 space-y-6">
                    <ImportantLinks openCreateLinkModal={openCreateLinkModal} />
                    <div className="w-full h-px bg-zinc-800" />
                    <GuestList openManageParticipantsModal={openManageParticipantsModal} />
                </div>
            </main>


            {
                showModal === MODAL.CREATE_ACTIVITY 
                && <CreateActivityModal closeCreateActivityModal={() => setShowModal(MODAL.NONE)} />
            }
            {
                showModal === MODAL.CREATE_LINKS    
                && <CreateLinkModal onCloseModal={()=> setShowModal(MODAL.NONE)} />
            }
            {
                showModal === MODAL.MANAGE_PARTICIPANTS
                && <InviteOrRemoveParticipantsModal onCloseModal={() => setShowModal(MODAL.NONE)} />
            }
        </div>
    )
}