import { Container } from "../../components/container"
import { DashboardHeader } from "../../components/painelHeader.tsx"
import { FiTrash2 } from "react-icons/fi"
import { useEffect, useState, useContext } from "react"
import { db } from "../../service/firebase.tsx"
import { collection, getDocs, where, query, doc, deleteDoc } from "firebase/firestore"
import { AuthContext } from "../../context/AuthContext.tsx"


interface CarsProps {
    id: string,
    name: string,
    uid: string,
    city: string,
    price: string | number,
    year: string,
    km: string,
    images: ImageCarProps 


}

interface ImageCarProps{
    name: string,
    uid: string,
    url: string
}

export function Dashboard(){
const [cars, setCars] = useState<CarsProps[]>([])
const {user} = useContext(AuthContext)

    useEffect(() => {
        async function loadCars() {
            if(!user?.uid){
                return
            }
                
            const carsRef = collection(db, "cars")
            const queryRef = query(carsRef, where("uid", "==", user.uid))


            await getDocs(queryRef)
                .then((snapshot) => {
                    console.log(snapshot.docs)
                    let listcars = [] as CarsProps[];
                    snapshot.forEach(doc => {
                        listcars.push({
                            id: doc.id,
                            name: doc.data().name,
                            year: doc.data().year,
                            km: doc.data().km,
                            city: doc.data().city,
                            price: doc.data().price,
                            images: doc.data().images,
                            uid: doc.data().uid,

                        })
                    })
                    setCars(listcars)
                    console.log(listcars[0]?.images)
                })

        }
        loadCars()
    }, [user])

   async function handleDelete(id: string){
        const docRef = doc(db, "cars", id)
        await deleteDoc(docRef)
        setCars(cars.filter(car => car.id !== id))

    }

    return(
        <Container>
           <DashboardHeader/>
           <main className=" gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {cars.map(car => (<section key={car.id} className="w-full bg-white rounded-lg relative ">
                    <button onClick={() => handleDelete(car.id)} className="absolute bg-white rounded-full w-10 h-10 cursor-pointer flex items-center justify-center right-2 drop-shadow top-1">
                        <FiTrash2 size={26} color="#000" />
                    </button>
                    <img
                        src={car.images[0]?.url}
                        alt=""
                        className="w-full rounded-lg mb-2 max-h-70 " />
                    <p className="font-bold mt-1 px-2 mb-2">{car.name}</p>

                    <div className="flex flex-col px-2">
                        <span className="text-zinc-400">
                            Ano {car.year} | {car.km}
                        </span>
                        <strong className="text-black font-bold mt-4 mb-2">
                            R${car.price}
                        </strong>
                    </div>

                    <div className="w-full h-px bg-zinc-400 mb-2"></div>

                    <span className="text-black p-2" >
                        {car.city}
                    </span>

                </section>))}
           </main>
        </Container>
    )
}