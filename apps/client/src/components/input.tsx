import React from "react";
import { tv, VariantProps } from "tailwind-variants"

interface InputProps extends React.ComponentProps<"input">, VariantProps<typeof WrapperVariants>{
    children: React.ReactNode,
    classNames?: {
        inputClassName?: string,
        wrapperClassName?: string
    }
}

const WrapperVariants = tv({
    base: "flex items-center gap-2",

    variants: {
        variation: {
            primary: "",
            secondary: "h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg"
        }
    },

    defaultVariants: {
        variation: "primary"
    }
})

const InputVariants  = tv({
    base: "bg-transparent text-lg placeholder-zinc-400 outline-none flex-1",
    variants: {
        inputVariation: {
            primary: "",
        }
    },

    defaultVariants: {
        inputVariation: "primary"
    }
})



export function Input({children, classNames, variation = "primary", ...rest}: InputProps){
    return(
        <div className={WrapperVariants({variation, className: classNames?.wrapperClassName})}>
            {children}
            <input
              className={InputVariants({inputVariation: "primary", className: classNames?.inputClassName})}
              {...rest}
            />
        </div>
    )
}

