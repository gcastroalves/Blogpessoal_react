import ListaPostagens from "../../components/postagem/listapostagem/ListaPostagem"
import ModalPostagem from "../../components/postagem/modalpostagem/ModalPostagem"

// Página inicial após o login - tela de boas-vindas do blog
function Home() {
  return (
    <>
    {/* Container principal: fundo branco, centraliza tudo, altura mínima de tela cheia */}
      <div className="bg-white flex justify-center items-center min-h-screen">

        {/* Grid responsivo: 
            - 1 coluna em celular 
            - 2 colunas em tablets e acima (md:) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 
                        max-w-6xl w-full px-6">

          {/* Lado esquerdo: textos + botão */}
          <div className="flex flex-col gap-6 justify-center">
            <h2 className="text-black text-6xl font-bold">
              Seja Bem Vindo(a)!
            </h2>

            <p className="text-black text-2xl">
              Expresse aqui seus pensamentos e opiniões
            </p>
              <div className="flex justify-around gap-4">
                <ModalPostagem />
            </div>
          </div>

          {/* Lado direito: imagem */}
          <div className="flex justify-center items-center">
            <img
              src="https://ik.imagekit.io/gcastro/imagemhome.jpg"
              alt="Imagem Página Home"
              className="w-3/4 max-w-md"
            />
          </div>

        </div>
      </div>
       <ListaPostagens />  {/* Renderiza a lista de postagens */}
    </>
  )
}

export default Home
