import React from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariant = tv({
    base: "rounded-lg py-2 px-5 font-medium flex items-center gap-2",

    variants: {
        variant: {
            primary: "bg-lime-300 text-lime-950 hover:bg-lime-400",
            secondary: "bg-zinc-800 text-zinc-200  hover:bg-zinc-700"
        }
    },

    defaultVariants: {
        variant: "primary"
    }
})

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariant> {
    children: React.ReactNode,
}

export function Button({children, variant , ...rest}:ButtonProps){
    return(
        <button {...rest} className={buttonVariant({ variant: variant})}>
            {children}
        </button>
    )
}