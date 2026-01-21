// Import do Link para navegação sem reload
import { Link } from 'react-router-dom'

// Import do tipo/modelo Tema (para tipagem forte)
import type Tema from '../../../models/Tema'

// Interface das props que o componente espera receber
interface CardTemaProps {
    tema: Tema          // ← obrigatório: um objeto Tema completo
}

// Componente recebe as props e desestrutura { tema }
function CardTema({ tema }: CardTemaProps) {
    return (
        // Caixa principal do cartão
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>

            {/* Cabeçalho – ainda fixo, mas pode mudar fácil */}
            <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl'>
                Tema
                {/* Sugestão: trocar por {tema.nome || tema.titulo || 'Tema sem nome'} */}
            </header>

            {/* Mostra a descrição REAL que veio do banco */}
            <p className='p-8 text-3xl bg-slate-200 h-full'>
                {tema.descricao || 'Sem descrição disponível'}
            </p>

            {/* Botões lado a lado */}
            <div className="flex">

                {/* Botão Editar → leva para o form de edição com ID */}
                <Link
                    to={`/editartema/${tema.id}`}   // ← rota dinâmica! ex: /editartema/5
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                               flex items-center justify-center py-2'
                >
                    <button>Editar</button>
                </Link>

                {/* Botão Deletar → leva para tela de confirmação com ID */}
                <Link
                    to={`/deletartema/${tema.id}`}  // ← rota dinâmica! ex: /deletartema/5
                    className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                               flex items-center justify-center'
                >
                    <button>Deletar</button>
                </Link>

            </div>
        </div>
    )
}

export default CardTema