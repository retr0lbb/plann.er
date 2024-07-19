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
    destination:  string;
    formatedDates: string
    isFetching: boolean
}

export function ConfirmTripModal({
  CloseIsConfirmTripModal, 
  createTrip, 
  setOwnerEmail, 
  setOwnerName,
  isFetching,
  destination,
  formatedDates
}: ConfirmTripModalProps){
    return(
      <Modal
        title="Confirmar criação de viagem"
        description={<p>Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">{destination}</span> nas datas de <span className="font-semibold text-zinc-100">{formatedDates}</span> preencha seus dados abaixo:</p>}
        onCloseModal={CloseIsConfirmTripModal}
        size="lg"
      >
         <form onSubmit={createTrip} className="space-y-3">

            <Input
              variation="secondary"
              type="text"
              name="text"
              placeholder="Seu nome completo"
              onChange={ e => setOwnerName(e.target.value)}
            >
              <User className="text-zinc-400 size-5" />
            </Input>

            <Input
              variation="secondary"
              type="email"
              name="email"
              placeholder="Seu e-mail pessoal."
              onChange={ e => setOwnerEmail(e.target.value)}
            >
              <Mail className="text-zinc-400 size-5" />
            </Input>


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