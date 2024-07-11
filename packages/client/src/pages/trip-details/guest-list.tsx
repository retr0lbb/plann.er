import { CircleDashed, UserCog } from "lucide-react"
import { Button } from "../../components/button"


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

            <Button size="full" variant="secondary">
                <UserCog className="text-zinc-200 size-5" />
                Gerenciar convidados
            </Button>
        </div>
    )
}