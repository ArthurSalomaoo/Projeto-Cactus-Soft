import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import PesquisarCliente from './pages/PesquisarCliente';
import InformacoesGerais from './pages/InformacoesGerais';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id='cabecalho'>
        <h1>
          Informações gerais da empresa
        </h1>
        
        <nav id='paginas'>
          <ul>
            <li>
              <Link style={{color: 'white'}} to="/pesquisa">Pesquisar Cliente</Link>
            </li>
            <li>
              <Link style={{color: 'white'}} to="/informacoes">Informações Gerais</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route path="/pesquisa" element={<PesquisarCliente />} />
        <Route path="/informacoes" element={<InformacoesGerais />} />
        <Route path="/" element={<h1>Bem-vindo ao Sistema de Gerenciamento de Clientes</h1>} />
      </Routes>
    </div>
  );
}

export default App;
