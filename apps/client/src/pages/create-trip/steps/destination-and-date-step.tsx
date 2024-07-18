import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../components/button";
import { today, getLocalTimeZone } from "@internationalized/date"
import { RangeCalendar } from "@nextui-org/calendar";
import React, { useState } from "react";
import { RangeValue, DateValue } from "@nextui-org/react"
import { Modal } from "../../../components/modal";
import {dayjs} from "../../../lib/dayjs-config"

interface DestinationAndDateStepProps {
    setEventStartAndEndDates: React.Dispatch<React.SetStateAction<RangeValue<DateValue> | undefined>>
    isGuestsInputOpen: boolean
    closeGuestsInput: () => void
    openGuestsInput: () => void
    setDestination: (destination: string) => void
    eventStartAndEndDates:  RangeValue<DateValue> | undefined
}

export function DestinationAndDateStep({
  closeGuestsInput, 
  isGuestsInputOpen, 
  openGuestsInput, 
  setDestination, 
  setEventStartAndEndDates, 
  eventStartAndEndDates }: DestinationAndDateStepProps){
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)


  function openDatePicker(){
    setIsDatePickerOpen(true)
  }
  function closeDatePicker(){
    setIsDatePickerOpen(false)
  }

  const startDisplayDate = dayjs(eventStartAndEndDates?.start.toDate(getLocalTimeZone())).format("DD MMM")
  const endDisplayDate = dayjs(eventStartAndEndDates?.end.toDate(getLocalTimeZone())).format("DD MMM")
  



    return(
        <div className="h-16 px-4 bg-zinc-900 rounded-xl overflow-hidden flex items-center shadow-shape gap-3">
          <div className="flex items-center gap-2 flex-1">
            <MapPin className="size-5 text-zinc-400" />
            
            <input
              disabled={isGuestsInputOpen}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              placeholder="Para onde você vai?"
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
              
            />
          </div>

          <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex items-center gap-2 text-left w-[240px]">
            <Calendar className="size-5 text-zinc-400" />
            <span
              className="text-lg text-zinc-400 w-40 flex-1"
            >
              {eventStartAndEndDates?.start !== undefined 
                ? `de ${startDisplayDate.toString()} até ${endDisplayDate.toString()}`
                : "Quando?"
              }
            </span>
          </button>


          {isDatePickerOpen && (
            <Modal
              title="Selecione a Data"
              description=""
              size="none"
              onCloseModal={closeDatePicker}
            >
              
               <RangeCalendar 
                  classNames={{
                    base: "border-none shadow-none w-full h-full",
                    cell: ""
                  }}
                  calendarWidth={"100%"}
                  color="primary"
                  aria-label="Date (No Selection)"
                  minValue={today(getLocalTimeZone()).add({
                    days: 1
                  })}
                  value={eventStartAndEndDates}
                  onChange={setEventStartAndEndDates}
               />

            </Modal>
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