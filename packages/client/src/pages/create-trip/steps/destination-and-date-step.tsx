import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { DateRange, DayPicker } from "react-day-picker"
import { useState } from "react";
import "react-day-picker/dist/style.css"

interface DestinationAndDateStepProps {
    isGuestsInputOpen: boolean
    closeGuestsInput: () => void
    openGuestsInput: () => void
}

export function DestinationAndDateStep({closeGuestsInput, isGuestsInputOpen, openGuestsInput}: DestinationAndDateStepProps){
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()


  function openDatePicker(){
    setIsDatePickerOpen(true)
  }
  function closeDatePicker(){
    setIsDatePickerOpen(false)
  }



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

          <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex items-center gap-2 text-left">
            <Calendar className="size-5 text-zinc-400" />
            <span
              className="text-lg text-zinc-400 w-40"
            >
              Quando?
            </span>
          </button>


          {isDatePickerOpen && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
    
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg">Selecione a Data</h2>
    
                  <button onClick={closeDatePicker} type="button">
                    <X className="size-5 text-zinc-400"/>
                  </button>
                </div>
            </div>
    
              <DayPicker mode="range" selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates}/>
            </div>
          </div>
          )}

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