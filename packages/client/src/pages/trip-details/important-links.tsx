import { Link2, Plus } from "lucide-react";

export function ImportantLinks(){
    return(
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Links importantes</h2>
            <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                        <a href="#" className="block text-xm text-zinc-400 truncate hover:text-zinc-200">
                            https://github.com/retr0lbbdajshjdhshdajhdjsahdjashdjhasjdhasjdhajdhjashdjashdjashdjha
                        </a>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                        <a href="#" className="block text-xm text-zinc-400 truncate hover:text-zinc-200">
                            https://github.com/retr0lbbdajshjdhshdajhdjsahdjashdjhasjdhasjdhajdhjashdjashdjashdjha
                        </a>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                        <a href="#" className="block text-xm text-zinc-400 truncate hover:text-zinc-200">
                            https://github.com/retr0lbbdajshjdhshdajhdjsahdjashdjhasjdhasjdhajdhjashdjashdjashdjha
                        </a>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0" />
                </div>
            </div>
            <button className="bg-zinc-800 w-full justify-center text-zinc-200 rounded-lg h-11 px-5 font-normal flex items-center gap-2 hover:bg-zinc-700">
                <Plus className="text-zinc-200 size-5" />
                Cadastrar novo link
            </button>
                    
        </div>
    )
}