import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";



interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    closeGuestsInput: () => void
    openGuestsInput: () => void
}

export function DestinationAndDateStep({closeGuestsInput, isGuestsInputOpen, openGuestsInput}: DestinationAndDateStepProps){
    return(
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
            <Button
            variant="secondary"
            onClick={closeGuestsInput} 
          >
            Alterar local/data
            <Settings2 className="text-zinc-200 size-5" />
          </Button>
          ): (
            <Button onClick={openGuestsInput}>
              Continuar
              <ArrowRight className="text-lime-950 size-5" />
            </Button>
          )}

        </div>
    )
}