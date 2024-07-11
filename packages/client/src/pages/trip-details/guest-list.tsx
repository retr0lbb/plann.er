import { CircleDashed, UserCog } from "lucide-react"


export function GuestList(){
    return(
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Convidados</h2>
                <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Howard Wolowitz</span>
                        <span className="block text-xm text-zinc-400 text-sm truncate">
                            retr0man@gmail.com
                        </span>
                    </div>
                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Leonard Hofstader</span>
                        <span className="block text-xm text-zinc-400 text-sm truncate">
                            le.hof@hotmail.com
                        </span>
                    </div>
                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Dr. Sheldon Cooper</span>
                        <span className="block text-xm text-zinc-400 text-sm truncate">
                            shelly_cooper.91@hotmail.com.br
                        </span>
                    </div>
                    <CircleDashed className="text-zinc-400 size-5 shrink-0" />
                </div>
                
            </div>
            <button className="bg-zinc-800 w-full justify-center text-zinc-200 rounded-lg h-11 px-5 font-normal flex items-center gap-2 hover:bg-zinc-700">
                <UserCog className="text-zinc-200 size-5" />
                Gerenciar convidados
            </button>
        </div>
    )
}