import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus, User } from "lucide-react";
import Logo from "../public/Logo.svg";
import { FormEvent, useState } from "react";

export function CreateTripPage() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)

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

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-2">
          <img src={Logo} alt="Planner" />
          <p className="text-zinc-300 text-lg">
            Convide seus amigos e planeje sua proxima viagem!
          </p>
        </div>


        <div className="space-y-4">
        <div className="h-16 px-4 bg-zinc-900 rounded-xl overflow-hidden flex items-center shadow-shape gap-3">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="size-5 text-zinc-400" />
            <input
              disabled={isGuestsInputOpen}
              type="text"
              placeholder="Para onde você vai?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
            />
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="size-5 text-zinc-400" />
            <input
              disabled={isGuestsInputOpen}
              type="text"
              placeholder="Quando?"
              className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"
            />
          </div>

          <div className="w-px h-6 bg-zinc-800" />

          {isGuestsInputOpen ? (
            <button
            onClick={closeGuestsInput}
            className="bg-zinc-800 text-zinc-200 rounded-lg py-2 px-5 font-normal flex items-center gap-2 hover:bg-zinc-700"
          >
            Alterar local/data
            <Settings2 className="text-zinc-200 size-5" />
          </button>
          ): (
            <button
            onClick={openGuestsInput}
            className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-normal flex items-center gap-2 hover:bg-lime-400"
          >
            Continuar
            <ArrowRight className="text-lime-950 size-5" />
          </button>
          )}

        </div>


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


      {isGuestsModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg">Selecionar convidados</h2>

                <button onClick={CloseGuestsModal} type="button">
                  <X className="size-5 text-zinc-400"/>
                </button>
              </div>
              <p className="text-sm text-zinc-400">Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
            </div>

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

              <button
                className="bg-lime-300 text-lime-950 rounded-lg py-2 px-5 font-semibold flex items-center gap-2 hover:bg-lime-400"
                type="submit"
              >
                Convidar
                <Plus className="text-lime-950 size-5" />
              </button>
            </form>
          </div>
        </div>
      )}


      {/* modalda3 */}

      {isConfirmTripModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg">Confirmar criação de viagem</h2>

              <button onClick={CloseIsConfirmTripModal} type="button">
                <X className="size-5 text-zinc-400"/>
              </button>
            </div>
            <p className="text-sm text-zinc-400">Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo:</p>
          </div>

          <form onSubmit={addNewEmailToInvite} className="space-y-3">
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <User className="text-zinc-400 size-5" />
              <input
                type="text"
                name="name"
                placeholder= "Seu nome completo"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />  
            </div>

            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <AtSign className="text-zinc-400 size-5" />
              <input
                type="email"
                name="email"
                placeholder= "Seu e-mail pessoal"
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              />  
            </div>

            <button
              className="bg-lime-300 w-full justify-center text-lime-950 rounded-lg h-11 px-5 font-semibold flex items-center gap-2 hover:bg-lime-400"
              type="submit"
            >
                Confirmar criação da viagem
            </button>
          </form>
        </div>
      </div>
      )}
    </div>
  );
}
