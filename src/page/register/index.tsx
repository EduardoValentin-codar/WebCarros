import { Link, useNavigate } from 'react-router'
import logoImg from '../../assets/logo.svg'
import { Container } from '../../components/container'
import { Input } from '../../components/input'
import {auth} from '../../service/firebase'
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'


import {useForm} from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().email("Insira um email valido").nonempty("Campo email é obrigatorio"),
  password: z.string().min(6, "A senha deve ter no minimo 6 caracteres").nonempty("O campo senha obrigatorio"),
  name: z.string().nonempty("Pôr favor digite seu nome ")
})

type FormData = z.infer<typeof schema>

export function Register() {

  const {handleInfoUser} = useContext(AuthContext)
  const navigete = useNavigate()

const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
  resolver: zodResolver(schema),
  mode: "onChange"
})

useEffect(()=>{
  async function handleLogout(){
    await signOut(auth)
  }
  handleLogout()
},[])


async function onSubmit(data: FormData){
 createUserWithEmailAndPassword(auth, data.email, data.password)
 .then(async(user) => {
  await updateProfile(user.user, {
    displayName: data.name
  })

  handleInfoUser({
    name: data.name,
    email: data.email,
    uid: user.user.uid
  })
  console.log("Cadastrado com sucesso!!!")
   navigete("/dashboard", {replace: true})

 })

 .catch((error)=>{
  console.log("Erro em registrar usuario")
  console.log(error)
 })

}

    return (
      <Container>
        <div className='w-full min-h-screen flex items-center justify-center flex-col gap-4 '>

           <Link className=' mb-6 max-w-sm w-full ' to= "/">
           <img 
           className='w-full'
           src={logoImg} 
           alt="Logo do site" />
           
           </Link>
           <form onSubmit={handleSubmit(onSubmit)} className='bg-white max-w-xl w-full rounded-lg p-4'>
            

            <div className='mb-3'>

              <Input
                type="text"
                placeholder="Digite seu nome completo..."
                name="name"
                error={errors.name?.message}
                register={register}
              />

            </div>



            <div className='mb-3'>
            
       <Input
       type="email"
       placeholder = "Digite seu email..."
       name= "email"
       error = {errors.email?.message}
       register = {register}
       />
      
      </div>

            <div className="mb-3">

              <Input
                type="password"
                placeholder="Digite sua senha..."
                name="password"
                error={errors.password?.message}
                register={register}
              />

            </div>


       <button type='submit' className='bg-zinc-900 w-full rounded-md text-white font-medium h-10 cursor-pointer'>
    Cadastrar
       </button>
           </form>

                <span className='font-bold'>
                    Já possui uma conta? <Link className='text-red-600' to="/login">Login</Link>
                </span>
           
        </div>
      </Container>
    )
}