import { Calendar, Tag} from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import { Modal } from "../../components/modal"; 

interface CreateActivityModalProps{
    closeCreateActivityModal: () => void
}

export function CreateActivityModal({closeCreateActivityModal}: CreateActivityModalProps){
  const {tripId} = useParams()
  
  
  async function createActivity(event: FormEvent<HTMLFormElement>){
    event.preventDefault()

    const data = new FormData(event.currentTarget)


    const title = data.get("title")?.toString()
    const occurs_at = data.get("occurs_at")?.toString()

    await api.post(`/trips/${tripId}/activities`,  {
      title: title,
      occurs_at: occurs_at
    })

    window.document.location.reload()
  }
    return(
      <Modal
        title="Criar atividade"
        description="As atividades criadas ficam disponiveis para todos os participantes da viagem"
        onCloseModal={closeCreateActivityModal}
        size="lg"
      >
        <form onSubmit={createActivity} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              name="title"
              placeholder= "Qual a atividade"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />  
          </div>
          <div className="flex items-center gap-2">
              <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Calendar className="text-zinc-400 size-5" />
                <input
                  type="datetime-local"
                  name="occurs_at"
                  placeholder= "Data e horário da atividade"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />  
              </div>
          </div>
          <Button
            className="mt-2"
            size="full"
            variant="primary"
            type="submit"
          >
              Salvar Atividade
          </Button>
        </form>
      </Modal>
    )
}