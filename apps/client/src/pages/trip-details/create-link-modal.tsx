import { FormEvent   } from "react";
import { Modal } from "../../components/modal";
import { Button } from "../../components/button";
import { Link2, Tag } from "lucide-react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface createLinkModalProps{
    onCloseModal: () => void
}

export function CreateLinkModal({onCloseModal}: createLinkModalProps){
    const {tripId} = useParams()
    
    async function createLink(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const title = data.get("title")?.toString()
        const url = data.get("url")?.toString()

        await api.post(`/trips/${tripId}/links`,  {
          title: title,
          url: url
        })

        window.document.location.reload()
    }

    return(
        <Modal
          title="Criar link importante."
          description="Todos os links importantes ficam visiveis para todos os participantes."
          onCloseModal={onCloseModal}
        >
        <form onSubmit={createLink} className="space-y-3">
          <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              name="title"
              placeholder= "Nome do link"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />  
          </div>
          <div className="flex items-center gap-2">
              <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Link2 className="text-zinc-400 size-5" />
                <input
                  type="url"
                  name="url"
                  placeholder = "URL do link"
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
              Salvar link
          </Button>
        </form>
        </Modal>
    )
}