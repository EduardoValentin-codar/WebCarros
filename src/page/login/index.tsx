import { Link, useNavigate } from 'react-router'
import logoImg from '../../assets/logo.svg'
import { Container } from '../../components/container'
import { Input } from '../../components/input'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../../service/firebase'
import { useEffect } from 'react'


import {useForm} from 'react-hook-form'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().email("Insira um email valido").nonempty("Campo email é obrigatorio"),
  password: z.string().nonempty("O campo senha obrigatorio")
})

type FormData = z.infer<typeof schema>

export function Login() {


  const navigate = useNavigate()

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

function onSubmit(data: FormData){
  signInWithEmailAndPassword(auth, data.email, data.password)
  .then((user)=>{

console.log(user)
  console.log("Logado com sucesso")
  navigate("/", {replace: true})

  })
  .catch((error)=>{

    console.log("Erro ao logar")
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
           <h1 className='text-3xl font-bold '>Login</h1>
           <form onSubmit={handleSubmit(onSubmit)} className='bg-white max-w-xl w-full rounded-lg p-4'>
            
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
        Acessar
       </button>
           </form>
          <span className='font-bold'>
            Não tem registro? <Link className='text-red-600' to="/register"> Registrar</Link>
          </span>
        </div>
      </Container>
    )
}