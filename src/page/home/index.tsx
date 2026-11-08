import { Container } from "../../components/container";
import { useState, useEffect } from "react";
import { 
    collection,
    query,
    getDocs,
    orderBy
 } from "firebase/firestore";
 import { db } from "../../service/firebase";
 import { Link } from "react-router";


 interface CarsProps{
    id: string,
    name: string,
    uid: string,
    city: string,
    price: string | number,
    year: string,
    km: string,
    images: CarsImage[]

 }

 interface CarsImage{
    uid: string,
    name: string,
    url: string
 }

export function Home() {
    const [cars, setCars] = useState<CarsProps[]>([])
    const [loadImages, setLoadImages] = useState<string[]>([])

    useEffect(() =>{
   async function loadCars(){
    const carsRef = collection(db, "cars")
    const queryRef = query(carsRef, orderBy("creater"))

   await getDocs(queryRef)
    .then((snapshot) =>{
        console.log(snapshot.docs)
        let listcars = [] as CarsProps[];
        snapshot.forEach( doc => {
            listcars.push({
                id: doc.id,
                name: doc.data().name,
                year: doc.data().year,
                km: doc.data().km,
                city: doc.data().city,
                price: doc.data().price,
                images: doc.data().images,
                uid: doc.data().uid
            })
        })
        setCars(listcars)
        console.log(listcars[0]?.images)
    })

   }
   loadCars()
    }, [])

    function handleImageLoad(id: string){
        setLoadImages((prevImageLoad) => [...prevImageLoad, id])

    }
    return (
        <Container>
           <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-3">
            <input
            className=" border-2 w-full rounded-lg h-9 px-3 outline-none" 
            placeholder="Digite o nome do seu carro..."/>
            
            <button className="bg-red-500 text-white font-medium px-8 rounded-lg h-9">
                Buscar
            </button>
           
           </section>
           
           <h1 className=" font-bold text-center mt-6 text-2xl mb-4">
            Carros novos usados em todo Brasil
           </h1>

            <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cars.map(car => (
                    <Link key={car.id} to={`/car/${car.id}`}>
                        <div className="w-full bg-slate-200 h-72 rounded-lg max-h-72 hover:scale-105 transition-all"
                        style={{display: loadImages.includes(car.id) ? "none" : "block"}}
                        >

                        </div>
                            <section key={car.id} className="w-full bg-white rounded-lg ">
                                <img
                                    className="w-full h-48 object-cover rounded-lg  mb-2 hover:scale-105 transition-all"
                                    src={car.images[0]?.url}
                                    alt={car.name}
                                    onLoad={() => handleImageLoad(car.id)}
                                    style={{display: loadImages.includes(car.id) ? "block" : "none" }}
                                />
                                <p className="font-bold mb-2 px-2">{car.name}</p>

                                <div className="flex flex-col px-2">
                                    <span className="text-zinc-700 mb-6">
                                        Ano {car.year} | {car.km} km
                                    </span>
                                    <strong className="text-black font-medium text-xl my-2">
                                        R$ {car.price}
                                    </strong>
                                    <div className="w-full h-px bg-slate-200 my-2"></div>
                                </div>

                                <div className="px-2 pb-2">
                                    <span className="text-zinc-700">{car.city}</span>
                                </div>
                            </section>
                    </Link>
                    ))}
                </main>
            </Container>
        )
    }