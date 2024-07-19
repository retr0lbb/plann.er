import React from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariant = tv({
    base: "rounded-lg py-2 px-5 font-medium flex items-center gap-2 justify-center",

    variants: {
        variant: {
            primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
            secondary: "bg-zinc-800 text-zinc-200 hover:bg-zinc-700",
        },

        size: {
            default: "py-2",
            full: "w-full h-11"
        },
        isDisable: {
            true: "cursor-not-allowed opacity-55 hover:none transition-all"
        }
    },

    defaultVariants: {
        variant: "primary",
        size: "default"
    }
})




interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariant> {
    children: React.ReactNode,
}

export function Button({children, variant, size, disabled, className, ...rest}:ButtonProps){
    return(
        <button {...rest} className={buttonVariant({ variant: variant, size: size, isDisable: disabled, className})} disabled={disabled}>
            {children}
        </button>
    )
}