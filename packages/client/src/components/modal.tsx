import { VariantProps } from "@nextui-org/react";
import { X } from "lucide-react";
import {tv} from "tailwind-variants"

interface ModalProps extends React.ComponentProps<"div">, VariantProps<typeof modalVariants>{
    onCloseModal?: () => void;
    title: string;
    description: string | React.ReactNode
}


const modalVariants = tv({
    base: "bg-zinc-900 px-6 py-5 rounded-xl shadow-shape space-y-5",

    variants: {
        size: {
            none: "",
            sm: "w-[340px]",
            md: "w-[460px]",
            lg: "w-[640px]"
        }
    },

    defaultVariants: {
        size: "none"
    },
})


export function Modal({children, size, title, description, className ,onCloseModal, ...rest}: ModalProps){
    return(
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
        <div className={modalVariants({size, className})} {...rest}>
            <header className="space-y-2">
                <div className="flex items-center">
                    <h2 className="text-lg flex-1">{title}</h2>

                    {onCloseModal  
                        ? (<button onClick={onCloseModal} type="button">
                            <X className="size-5 text-zinc-400"/>
                          </button>)
                        : ""
                    }
                </div>

                <p className="text-sm text-zinc-500">{description}</p>
            </header>

            {children}
        </div>
    </div>
    )
}