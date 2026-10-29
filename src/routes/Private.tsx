import { useContext } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

interface PrivateProps{
    children: ReactNode
}


export function Private({children}: PrivateProps): any {
    
    const {signed, loadingAuth} = useContext(AuthContext)
    if(loadingAuth){
        return <div className="flex items-center justify-center mt-28"><UseAnimations animation={loading} size={50} /></div>

    }

    if(!signed){
        return <Navigate to="/login"/>
    }
    
    
    
    return children
}