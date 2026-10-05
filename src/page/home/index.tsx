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

        <main>
            <section>
                    <img src="https://cdn.motor1.com/images/mgl/koBzYx/s1/2024-chevrolet-camaro-zl1-collector-s-edition.webp" alt="Camaro 2026" />
                    <p>Chevrolet Camaro</p>
            </section>
        </main>
        </Container>
    )
}