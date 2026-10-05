import { Container } from "../../components/container";

export function Home() {
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

        <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg: grid-rows-3">
            <section className="w-full bg-white rounded-lg">
                    <img
                    className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all" 
                    src="https://cdn.motor1.com/images/mgl/koBzYx/s1/2024-chevrolet-camaro-zl1-collector-s-edition.webp" alt="Camaro 2026" />
                    <p className="font-bold mb-2 px-2">Chevrolet Camaro</p>
                    
                    <div className=" flex flex-col px-2 ">
                        <span className="text-zinc-700 mb-6">
                            Ano 2024/2024 | 23.000 km
                        </span>
                        <strong className="text-black font-medium text-xl my-2">R$ 468.000</strong>

                    <div className="w-full h-px bg-slate-200 my-2"></div>
                    </div>
                    <div className="px-2 pb-2">
                        <span className="text-zinc-700">
                            São Paulo - SP
                        </span>
                    </div>
            </section>
            
        </main>
        </Container>
    )
}