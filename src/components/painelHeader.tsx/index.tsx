import { Link } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../service/firebase";

export function DashboardHeader(){

    async function handleLogout(){
        await signOut(auth)
    }
    return(
        <div className="bg-red-500 w-full flex items-center h-10 rounded-lg text-white font-medium gap-4 px-4 mb-4">
            <Link to= "/dashboard">
            Dashboard
            </Link>
            <Link to= "/dashboard/new">
            Cadastrar Carro
            </Link>

            <button className="ml-auto" onClick={handleLogout}>
                Sair da conta
            </button>
        </div>
    )
}