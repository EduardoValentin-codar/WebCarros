import { Container } from "../../../components/container/index.tsx" 
import { DashboardHeader } from "../../../components/painelHeader.tsx/index.tsx" 
import UseAnimations from 'react-useanimations';
import upload from 'react-useanimations/lib/upload';
import { useForm } from "react-hook-form";
import { Input } from "../../../components/input/index.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from 'zod'
import { ChangeEvent, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext.tsx";
import { uploadImage } from "../../../service/cloudinary.ts"; // ajuste o caminho
import { db } from "../../../service/firebase.tsx";
import { addDoc, collection } from "firebase/firestore";



const schema = z.object({
    name: z.string().nonempty("O campo nome é obrigatório"),
    model: z.string().nonempty("O campo modelo é obrigatório"),
    year: z.string().nonempty("O Ano é obrigatório"),
    km: z.string().nonempty("O KM é obrigatório"),
    price: z.string().nonempty("O preço é obrigatório"),
    city: z.string().nonempty("A cidade é obrigatória"),
    whatsapp: z
        .string()
        .nonempty("O telefone é obrigatório")
        .refine(
            (value) => /^(\d{11,12})$/.test(value),
            {
                message: "Número de telefone inválido",
            }
        ),
    description: z.string().nonempty("A descrição é obrigatória")
});


type FormData = z.infer<typeof schema>;

interface ImageItemProps {
    uid: string;
    name: string;
    url: string;
    
}









export function New(){


   

    const {user} = useContext(AuthContext)

    const {register, handleSubmit, formState: {errors}, reset} = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"

    })

    const [carImages, setCarImages] = useState<ImageItemProps[]>([]);


    async function handleFile(e: ChangeEvent<HTMLInputElement>) {
        const image = e.target.files?.[0];
        if (!image) return;

        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(image.type)) {
            console.log("A imagem tem que ser JPEG, PNG ou WEBP");
            return;
        }

        if (image.size > 5 * 1024 * 1024) {
            console.log("A imagem tem que ter no máximo 5 MB");
            return;
        }

        await handleUpload(image);
        e.target.value = "";
    }

    async function handleUpload(image: File) {
        if (!user?.uid) return;

        try {
            const downloadUrl = await uploadImage(image);
            console.log(downloadUrl);

            setCarImages((images) => [
                ...images,
                { uid: user.uid, name: image.name, url: downloadUrl,  },
            ]);
        } catch (error) {
            console.log(error);
        }
    }

    function onSubmit(data: FormData) {
        if(carImages.length === 0){
            alert("Envie uma imagen do carro")
            return
        }

        const cartList = carImages.map(car => {
            return{
                uid: car.uid,
                name: car.name,
                url: car.url
            }
        })

        addDoc(collection(db, "cars"), {
            name: data.name,
            model: data.model,
            whatsapp: data.whatsapp,
            city: data.city,
            year: data.year,
            km: data.km,
            description: data.description,
            price: data.price,
            creater: new Date(),
            owner: user?.name,
            uid: user?.uid,
            images: cartList,

            
        })
        .then(() =>{
            reset()
            setCarImages([])
        console.log("Deu certo")
        })
        .catch((error) => {
            console.log(error)

        })
        
    }

    function handleDeleteImage(item: ImageItemProps) {
        setCarImages((images) => images.filter((img) => img.url !== item.url));
    }

    return(
        <Container>
           <DashboardHeader/>
           <div className="w-full bg-white p-3 rounde-lg flex flex-col sm:flex-row items-center gap-2">
            <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
                <div className="absolute cursor-pointer">
                        <UseAnimations animation={upload} size={40} color="#000"/>
                </div>
                <div className="cursor-pointer">
                    <input type="file" accept="image/" className="opacity-0 cursor-pointer" onChange={handleFile}/>
                </div>
            </button>
                

                    {carImages.map((item) => (
                        <div key={item.url} className="relative h-32 w-full items-center flex justify-center">
                            <button
                                type="button"
                                onClick={() => handleDeleteImage(item)}
                                className="absolute top-1 right-1 z-10 rounded-full bg-black/60 px-2 text-white cursor-pointer"
                                aria-label="Remover foto"
                            >
                                ✕
                            </button>
                            <img
                                src={item.url}
                                alt="Foto do carro"
                                className="h-32 w-full rounded-lg object-cover"
                            />
                        </div>
                    ))}
                

           </div>
           <div className="w-full bg-white rounded-lg flex flex-col sm:flex-row gap-2 mt-2">
            <form
            className="w-full px-2"
            onSubmit={handleSubmit(onSubmit)}
            >
                <div className="mb-3">

                    <p className="mb-2 font-medium">
                        Nome do Carro
                    </p>
                    <Input
                    type="text"
                    register={register}
                    name="name"
                    error= {errors.name?.message}
                    placeholder="Ex: Onix 1.0..."
                    />

                </div>
                <div className="mb-3">

                    <p className="mb-2 font-medium">
                        Modelo do Carro
                    </p>
                    <Input
                    type="text"
                    register={register}
                    name="model"
                    error= {errors.model?.message}
                    placeholder="Ex: 1.0 Flex Plus Manual "
                    />

                </div>
                <div className="flex w-full mb-3 flex-row items-center gap-4">
                        <div className="w-full">

                            <p className="mb-2 font-medium">
                                Ano do Carro
                            </p>
                            <Input
                                type="text"
                                register={register}
                                name="year"
                                error={errors.year?.message}
                                placeholder="Ex: 2016/2016... "
                            />

                        </div>
                        <div className="w-full">

                            <p className="mb-2 font-medium">
                                KM rodados
                            </p>
                            <Input
                                type="text"
                                register={register}
                                name="km"
                                error={errors.km?.message}
                                placeholder="Ex: 23.890km "
                            />

                        </div>

                </div>

                    <div className="flex w-full mb-3 flex-row items-center gap-4">
                        <div className="w-full">

                            <p className="mb-2 font-medium">
                                Telefone/Whatsapp
                            </p>
                            <Input
                                type="text"
                                register={register}
                                name="whatsapp"
                                error={errors.whatsapp?.message}
                                placeholder="Ex: 739997890 "
                            />

                        </div>
                        <div className="w-full">

                            <p className="mb-2 font-medium">
                                Cidade
                            </p>
                            <Input
                                type="text"
                                register={register}
                                name="city"
                                error={errors.city?.message}
                                placeholder="Ex: Salvador - BA... "
                            />

                        </div>

                    </div>
                    <div className="mb-3">

                        <p className="mb-2 font-medium">
                            Preço
                        </p>
                        <Input
                            type="price"
                            register={register}
                            name="price"
                            error={errors.price?.message}
                            placeholder="Ex: $68.000... "
                        />

                        <div className="mb-3 ">
                            <p className="mb-2 font-medium">Descrição</p>
                            <textarea
                                className="w-full border-2 rounded-md h-24 px-2"
                                id="description"
                                placeholder="Digite a descrição sobre o carro"
                                {...register("description")}
                            />

                            {errors.description && (
                                <p className="mb-1 text-red-500">
                                    {errors.description.message}
                                </p>
                            )}

                        </div>

                    </div>
                    <button type="submit" className="mb-2 rounded-md bg-zinc-900 text-white font-medium w-full h-10 cursor-pointer">
                   Cadastrar
                    </button>
            </form>

           </div>
        </Container>
    )
}