import { Link2, Link2Off, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

export interface ImportantLink {
    id: string,
    title: string,
    url: string,
    trip_id: string
}

export function ImportantLinks({openCreateLinkModal}:{openCreateLinkModal: ()=>void}){
    const {tripId} = useParams()
    const [links, setLinks] = useState<ImportantLink[] | undefined>()

    useEffect(()=> {
        api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
    }, [tripId])
    return(
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">Links importantes</h2>
            <div className="space-y-5">

                {links?.map( item => {
                    return (
                        <div key={item.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">{item.title}</span>
                                <a 
                                  href={item.url} 
                                  target="_blank" 
                                  rel="noopener Noreferrer" 
                                  className="block text-xm text-zinc-400 truncate hover:text-zinc-200"
                                >
                                    {item.url}  
                                </a>
                            </div>
                            <Link2 className="text-zinc-400 size-5 shrink-0" />
                        </div>
                    )
                })}

                {links?.length === 0 && (
                    <div className="flex flex-1 min-h-16 items-center justify-center gap-2">
                        <Link2Off size={20} className="text-zinc-600" />
                        <p className="text-sm text-zinc-600">Nenhum link cadastrado.</p>
                    </div>
                )}
            </div>


            <Button onClick={openCreateLinkModal} size="full" variant="secondary">
                <Plus className="text-zinc-200 size-5" />
                Cadastrar novo link
            </Button>  
        </div>
    )
}