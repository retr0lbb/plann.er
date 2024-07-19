import { Mail, User } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Spinner } from "../../components/spinner";
import { Input } from "../../components/input";

interface ConfirmTripModalProps{
    CloseIsConfirmTripModal: () => void
    createTrip: (event: FormEvent<HTMLFormElement>) => void
    setOwnerName: (ownerName: string)  => void
    setOwnerEmail: (ownerEmail: string) => void
    isFetching: boolean
}

export function ConfirmTripModal({
  CloseIsConfirmTripModal, 
  createTrip, 
  setOwnerEmail, 
  setOwnerName,
  isFetching
}: ConfirmTripModalProps){
    return(
      <Modal
        title="Confirmar criação de viagem"
        description={<p>Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>}
        onCloseModal={CloseIsConfirmTripModal}
        size="lg"
      >
         <form onSubmit={createTrip} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <User className="text-zinc-400 size-5" />
              <input
                onChange={e => setOwnerName(e.target.value)}
                type="text"
                name="name"
                placeholder= "Seu nome completo"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />  
            </div>

            <Input
              variation="secondary"
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal."
              onChange={ e => setOwnerEmail(e.target.value)}
            >
              <Mail className="text-zinc-400 size-5" />
            </Input>

            {/* <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <Mail className="text-zinc-400 size-5" />
              <input
                onChange={ e => setOwnerEmail(e.target.value)}
                type="email"
                name="email"
                placeholder= "Seu e-mail pessoal"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />  
            </div> */}


            <Button
              size="full"
              variant="primary"
              type="submit"
              disabled={isFetching}
            >
                {isFetching ? <Spinner size="md" color="secondary"/> : "Confirmar criação da viagem"}
            </Button>
          </form>
      </Modal>
    )
}