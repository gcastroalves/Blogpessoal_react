import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Cadastro from './pages/cadastro/Cadastro';
import Login from './pages/login/Login';
import { AuthProvider } from './contexts/AuthContext'


function App() {
  return (
    // Fragmento do React (<>): serve para envolver vários elementos sem criar uma <div> extra no HTML
    <>

    <AuthProvider> {/* provedor de autenticação */}

      {/* Gerenciador de rotas: O BrowserRouter é o "pai" de todos: ele permite que a navegação aconteça no navegador */}
      <BrowserRouter>
        
        {/* A Navbar fica fora do <Routes> porque ela deve aparecer em TODAS as páginas */}
        <Navbar />

        {/* Uma div para garantir que o conteúdo principal tenha pelo menos 80% da altura da tela */}
        <div className="min-h-[80vh]">
          
          {/* O Routes é o "seletor": ele decide qual página mostrar com base no endereço (URL) */}
          <Routes>
            
            {/* O Route define o caminho: se o endereço for '/', mostre o componente <Home /> */}
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path='/cadastro' element={<Cadastro />} />
            
          </Routes>
        </div>

        {/* O Footer também fica fora do <Routes> para sempre aparecer no rodapé, independente da página */}
        <Footer />

      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

// Exporta o componente App para que ele possa ser usado no arquivo principal (main.tsx ou index.js)
export default App;