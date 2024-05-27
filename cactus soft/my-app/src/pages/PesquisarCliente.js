import React, { useState } from 'react';
import axios from 'axios';
import '../css/PesquisarCliente.css'

const PesquisarCliente = () => {
  const [nomeCliente, setNomeCliente] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detalhesCliente, setDetalhesCliente] = useState({}); // Estado para armazenar visibilidade dos detalhes de cada cliente

  const pesquisarCliente = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3333/findClienteByName?name=${nomeCliente}`);
      setData(response.data);
      setError(null);
      setDetalhesCliente({});
    } catch (error) {
      setError(error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const valorInput = (event) => {
    setNomeCliente(event.target.value);
  };

  const esconderDetalhes = (id) => {
    setDetalhesCliente(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div>
      <h1>Pesquisar Cliente</h1>
      <label>
        <span>Informe o nome do cliente: </span>
        <input value={nomeCliente} onChange={valorInput} name="myInput" />
      </label>
      <button onClick={pesquisarCliente}>
        Pesquisar
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <h2 className='h2dadosClientes'>Dados dos Clientes:</h2>
      {data && (
        <div id='clientes'>
          {data.map((cliente) => (
            <div className='cliente' key={cliente.id}>
              <h3 className='nomeCliente'>{cliente.nomeCliente}</h3>
              <button onClick={() => esconderDetalhes(cliente.id)}>
                {detalhesCliente[cliente.id] ? 'Ocultar Detalhes' : 'Mostrar Detalhes'}
              </button>
              {detalhesCliente[cliente.id] && (
                <div className='clienteInforemacoes'>
                  <p>Status do cliente: {cliente.statusCliente}</p>
                  <p>IP concentrador: {cliente.ipConcentrador}</p>
                  <p>Nome concentrador: {cliente.nomeConcentrador}</p>
                  <p>Latitude do cliente: {cliente.latitudeCliente}</p>
                  <p>Longitude do cliente: {cliente.longitudeCliente}</p>
                  <p>Data e hora da conexão inicial: {cliente.conexaoInicial}</p>
                  <p>Data e hora da conexão final: {cliente.conexaoFinal}</p>
                  <p>Tempo conectado: {cliente.tempoConectado}</p>
                  <p>Comsumo de download: {cliente.consumoDownload}</p>
                  <p>Consumo de upload: {cliente.consumoUpload}</p>
                  <p>Motivo desconexão: {cliente.motivoDesconexao}</p>
                  <p>POP cliente: {cliente.popCliente}</p>
                  <p>Endereço do cliente: {cliente.enderecoCliente}</p>
                  <p>Bairro do cliente: {cliente.bairroCliente}</p>
                  <p>Cidade do cliente: {cliente.cidadeCliente}</p>
                  <p>Plano contratado: {cliente.planoContrato}</p>
                  <p>Status da internet: {cliente.statusInternet}</p>
                  <p>Valor do plano: {cliente.valorPlano}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PesquisarCliente;
