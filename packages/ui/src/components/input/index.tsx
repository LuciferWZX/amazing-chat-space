import {Input as BaseInput} from '../ui/input'
import {type ComponentProps, useState} from "react";
import {cn} from "@/lib/utils.ts";
import {EyeIcon, EyeOffIcon} from "lucide-react";
interface InputProps extends ComponentProps<typeof BaseInput>{
    hideEye?:boolean
}
export const Input = (props:InputProps) => {
    const {hideEye,className,type,...restProps}=props
    const [isVisible,setIsVisible]=useState<boolean>(false)
    const child = <BaseInput className={cn(className)} type={type} {...restProps}/>
    if (type === 'password' && hideEye!==false){
        return (
            <div className="relative">
                <BaseInput
                    className={cn("pe-9",className)}
                    placeholder="Password"
                    type={isVisible ? "text" : "password"}
                    {...restProps}
                />
                <button
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={()=>setIsVisible(oldState=>!oldState)}
                    aria-label={isVisible ? "Hide password" : "Show password"}
                    aria-pressed={isVisible}
                    aria-controls="password"
                >
                    {isVisible ? (
                        <EyeOffIcon size={16} aria-hidden="true" />
                    ) : (
                        <EyeIcon size={16} aria-hidden="true" />
                    )}
                </button>
            </div>
        )
    }
    return child
}
