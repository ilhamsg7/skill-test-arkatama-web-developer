import { PropsWithChildren } from "react";

export const GuestLayout = (props: PropsWithChildren) => {

    return (
        <div className="h-svh w-full bg-white" >
            {props.children}
        </div>
    )

}