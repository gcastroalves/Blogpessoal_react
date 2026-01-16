import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

  const navigate = useNavigate();
  const {handleLogout} = useContext(AuthContext);

  function logout(){
    handleLogout();
    alert("Usuário deslogado com sucesso!");
    navigate('/');
  }

  return (
    <>
      <div className='w-full flex justify-center py-4
        bg-indigo-900 text-white'>

        <div className="container flex justify-between text-lg mx-8">
            <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>  
                    {/* O <Link> é o substituto da tag <a> do HTML. Ele troca de página sem recarregar o navegador (Single Page Application).
                    - to='/home': Define o destino (para onde o usuário vai ao clicar).
                    - className: Aplica estilos do Tailwind (texto grande e em negrito). */}

          <div className='flex gap-4'>
            Postagens
            Temas
            Cadastrar tema
            Perfil
           <Link to='' onClick={logout} className='hover:underline'>Sair</Link>

          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
