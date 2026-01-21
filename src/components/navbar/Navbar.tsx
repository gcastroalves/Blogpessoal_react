
// Barra de navegação superior que aparece em quase todas as páginas

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  // Ferramenta para redirecionar o usuário para outra página pelo código
  const navigate = useNavigate();

  // Pega APENAS a função de logout que está guardada no AuthContext
  const { handleLogout } = useContext(AuthContext);

  // Função que é chamada quando o usuário clica em "Sair"
  function logout() {
    handleLogout();                           // Limpa tudo relacionado ao login
    alert("Usuário deslogado com sucesso!");  // Mostra mensagem de confirmação
    navigate("/");                            // Volta para a página inicial (login)
  }

  return (
    <>
      {/* Container principal da navbar - ocupa toda a largura */}
      <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">

        {/* Container com largura controlada + espaçamento */}
        <div className="container flex justify-between text-lg mx-8">

          {/* Logo / Nome do blog */}
          {/* Clicar leva para /home */}
          <Link
            to="/home"
            className="text-2xl font-bold"
          >
            Blog Pessoal
          </Link>

          {/* Links do lado direito */}
          <div className="flex gap-4">
        
            <Link to='/postagens' className='hover:underline'>Postagens</Link>

            <Link to='/temas' className='hover:underline'>Temas</Link>

            <Link to='/cadastrartema' className='hover:underline'>Cadastrar tema</Link>

            Perfil

            {/* Botão de logout */}
            {/* to='' é usado só porque é obrigatório no Link */}
            {/* O comportamento real está no onClick */}
            <Link to="" onClick={logout}className="hover:underline"
            >
              Sair
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;