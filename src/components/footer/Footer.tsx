// Importa os ícones das redes sociais da biblioteca Phosphor Icons, apenas os ícones que vamos usar
import { LinkedinLogoIcon, GithubLogoIcon } from "@phosphor-icons/react"

// Define o componente Footer
function Footer() {

  let data = new Date().getFullYear()  // Pega o ano atual automaticamente

  return (
    <>
      {/* Footer principal */}
      <div className="flex justify-center bg-indigo-900 text-white">
        
        {/* Container interno */}
        <div className="container flex flex-col items-center py-4">

          {/* Texto do footer */}
          <p className="text-xl font-bold">
            Blog Pessoal Generation | Copyright: {data}
          </p>

          {/* Texto auxiliar */}
          <p className="text-lg">
            Acesse minhas redes profissionais
          </p>

          {/* Ícones das redes */}
          <div className="flex gap-2">

            <LinkedinLogoIcon size={48} weight="bold" />  {/* Ícone do LinkedIn */}
            <GithubLogoIcon size={48} weight="bold" /> {/* Ícone do GitHub */}

          </div>
        </div>
      </div>
    </>
  )
}

// Exporta o componente
export default Footer
