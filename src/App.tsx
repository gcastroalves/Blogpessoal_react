// 1. Importa as ferramentas que vamos usar
import { BrowserRouter, Route, Routes } from 'react-router-dom';         
import Footer from './components/footer/Footer';                        
import Navbar from './components/navbar/Navbar';                       
import Home from './pages/home/Home';                                  
import Cadastro from './pages/cadastro/Cadastro';                      
import Login from './pages/login/Login';                               
import { AuthProvider } from './contexts/AuthContext'                  
import ListaTemas from './components/tema/listatemas/ListaTemas';
import FormTema from './components/tema/formtema/FormTema'
import DeletarTema from './components/tema/deletartema/DeletarTema';
import ListaPostagens from './components/postagem/listapostagem/ListaPostagem';
import FormPostagem from './components/postagem/formpostagem/FormPostagem';
import DeletarPostagem from './components/postagem/deletarpostagem/DeletarPostagem';
import Perfil from './pages/perfil/Perfil';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


// Aqui começa a função principal (o "chefe" da aplicação)
function App() {
  return (
    <>
      {/* O AuthProvider "embrulha" tudo → permite que TODAS as páginas saibam se a pessoa está logada */}
      <AuthProvider>
      
      <ToastContainer />     


        {/* BrowserRouter → ativa o sistema de rotas (muda a página sem recarregar o site) */}
        <BrowserRouter>

          {/* Navbar aparece em TODAS as páginas (barra de navegação de cima) */}
          <Navbar />

          {/* Área principal onde as páginas vão aparecer */}
          {/* min-h-[80vh] → garante que o conteúdo tenha altura mínima boa */}
          <div className="min-h-[80vh]">

            {/* Aqui ficam definidas as ROTAS (os endereços do site) */}
            <Routes>

              {/* Quando a pessoa entra no site (endereço /) → mostra a tela de Login */}
              <Route path="/" element={<Login />} />

              {/* Endereço /home → mostra a página inicial com posts */}
              <Route path="/home" element={<Home />} />

              {/* Endereço /cadastro → mostra o formulário de cadastro */}
              <Route path="/cadastro" element={<Cadastro />} />

              {/* Endereço /temas → mostra a Lista de Temas (os cards) */}
              <Route path="/temas" element={<ListaTemas />} />
              
              <Route path="/cadastrartema" element={<FormTema />} />

              <Route path="/editartema/:id" element={<FormTema/>} />

              <Route path="/deletartema/:id" element={<DeletarTema />} />

              <Route path="/postagens" element={<ListaPostagens />} />

              <Route path="/cadastrarpostagem" element={<FormPostagem />} />
              
              <Route path="/editarpostagem/:id" element={<FormPostagem />} />

              <Route path="/deletarpostagem/:id" element={<DeletarPostagem />} />

              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>

          {/* Footer aparece em TODAS as páginas (parte de baixo) */}
          <Footer />

        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App;