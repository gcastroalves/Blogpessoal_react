import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { useContext, type ReactNode } from "react"
import { AuthContext } from "../../contexts/AuthContext"


function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode
    
        if (usuario.token !== "") {
    
            component = ( 

                <div className="bg-stone-100 border-t border-neutral-300 py-10 text-center text-sm tracking-wide text-neutral-500">
                    <div className="container flex flex-col items-center py-4">
                        <p className='text-xl font-bold'>
                                Blog Pessoal Generation | Copyright: {data}
                            </p>
                        <p className='text-lg'>Acesse nossas redes sociais</p>
                        <div className='flex gap-2'>
                        <a href="https://www.linkedin.com/in/gcastroalves/" target="_blank"> 
                        <LinkedinLogoIcon size={48} weight="bold" /> 
                            </a>

                        <a href="https://github.com/gcastroalves" target="_blank">
                       <GithubLogoIcon size={48} weight="bold" />
                            </a>
                        </div>
                    </div>
                </div>
            )
        }

    return (
        <>
            { component }
        </>
    )
}

export default Footer