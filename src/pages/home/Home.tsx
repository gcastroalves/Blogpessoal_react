function Home() {
  return (
    <>
      <div className="bg-white flex justify-center items-center min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 
                        max-w-6xl w-full px-6">

          <div className="flex flex-col gap-6 justify-center">
            <h2 className="text-black text-6xl font-bold">
              Seja Bem Vinde!
            </h2>

            <p className="text-black text-2xl">
              Expresse aqui seus pensamentos e opiniões
            </p>

            <div>
              <button
                className="rounded text-black font-semibold
                           border-black border-2 py-3 px-6
                           hover:bg-black hover:text-white
                           transition"
              >
                Nova Postagem
              </button>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <img
              src="https://ik.imagekit.io/gcastro/imagemhome.jpg"
              alt="Imagem Página Home"
              className="w-3/4 max-w-md"
            />
          </div>

        </div>
      </div>
    </>
  )
}

export default Home
