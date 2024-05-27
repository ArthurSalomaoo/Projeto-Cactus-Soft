import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/InformacoesGerais.css';

const InformacoesGerais = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [quantOnline, setClienteOnline] = useState(0);
  const [quantOffline, setClienteOffline] = useState(0);
  const [clientesPorPlano, setClientesPorPlano] = useState({});
  const [totalReceita, setTotalReceita] = useState(0);
  const [consumoTotalDownload, setConsumoTotalDownload] = useState(0);
  const [consumoTotalUpload, setConsumoTotalUpload] = useState(0);
  const [mediaTempoConectado, setMediaTempoConectado] = useState(0);
  const [clientesPorCidade, setClientesPorCidade] = useState({});
  const [clientesPorConcentrador, setClientesPorConcentrador] = useState({});
  const [filtroTipoInternet, setFiltroTipoInternet] = useState('');
  const [filtroCidade, setFiltroCidade] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  const infoClientes = async () => {
    try {
      const response = await axios.get("http://localhost:3333/findClienteByName?name=");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    infoClientes();
  }, []);

  useEffect(() => {
    if (data) {
      const filtered = data.filter(cliente => {
        const tipoPlano = cliente.planoContrato.toLowerCase();
        const isFibra = tipoPlano.includes('fibra');
        const isBandaLarga = tipoPlano.includes('banda larga');
        const isOutros = !isFibra && !isBandaLarga;

        const matchTipoInternet =
          (filtroTipoInternet === '' || 
          (filtroTipoInternet === 'fibra' && isFibra) || 
          (filtroTipoInternet === 'banda larga' && isBandaLarga) ||
          (filtroTipoInternet === 'outros' && isOutros));

        const matchCidade =
          filtroCidade === '' || cliente.cidadeCliente.toLowerCase().includes(filtroCidade.toLowerCase());

        const matchStatus =
          filtroStatus === '' || (filtroStatus === 'online' && cliente.statusCliente) || (filtroStatus === 'offline' && !cliente.statusCliente);

        return matchTipoInternet && matchCidade && matchStatus
      });
      setFilteredData(filtered);
    }
  }, [data, filtroTipoInternet, filtroCidade, filtroStatus]);

  useEffect(() => {
    if (filteredData) {
      const quantOnline = filteredData.reduce((count, cliente) => cliente.statusCliente ? count + 1 : count, 0);
      const quantOffline = filteredData.reduce((count, cliente) => !cliente.statusCliente ? count + 1 : count, 0);
      setClienteOnline(quantOnline);
      setClienteOffline(quantOffline);

      const quantClientesPlanos = filteredData.reduce((acc, cliente) => {
        const plano = cliente.planoContrato;
        acc[plano] = (acc[plano] || 0) + 1;
        return acc;
      }, {});
      setClientesPorPlano(quantClientesPlanos);

      const totalReceita = filteredData.reduce((total, cliente) => total + (cliente.valorPlano || 0), 0);
      setTotalReceita(totalReceita);

      const consumoTotalDownload = filteredData.reduce((total, cliente) => total + (Number(cliente.consumoDownload) || 0), 0);
      setConsumoTotalDownload(consumoTotalDownload / (1024 ** 4)); 

      const consumoTotalUpload = filteredData.reduce((total, cliente) => total + (Number(cliente.consumoUpload) || 0), 0);
      setConsumoTotalUpload(consumoTotalUpload / (1024 ** 4));

      const totalTempoConectado = filteredData.reduce((total, cliente) => total + (Number(cliente.tempoConectado) || 0), 0);
      const mediaTempoConectado = filteredData.length ? totalTempoConectado / filteredData.length : 0;
      setMediaTempoConectado(mediaTempoConectado);

      const clientesPorCidade = filteredData.reduce((acc, cliente) => {
        const cidade = cliente.cidadeCliente;
        acc[cidade] = acc[cidade] || { online: 0, offline: 0 };
        if (cliente.statusCliente) {
          acc[cidade].online++;
        } else {
          acc[cidade].offline++;
        }
        return acc;
      }, {});
      setClientesPorCidade(clientesPorCidade);

      const clientesPorConcentrador = filteredData.reduce((acc, cliente) => {
        const concentrador = cliente.nomeConcentrador;
        acc[concentrador] = acc[concentrador] || { online: 0, offline: 0 };
        if (cliente.statusCliente) {
          acc[concentrador].online++;
        } else {
          acc[concentrador].offline++;
        }
        return acc;
      }, {});
      setClientesPorConcentrador(clientesPorConcentrador);
    }
  }, [filteredData]);

  return (
    <div>
      <h1>Informações Gerais</h1>

      <div id='filtros'>
        <label>
          Tipo de Internet:
          <select value={filtroTipoInternet} onChange={e => setFiltroTipoInternet(e.target.value)}>
            <option value=''>Todos</option>
            <option value='fibra'>Fibra</option>
            <option value='banda larga'>Banda Larga</option>
            <option value='outros'>Outros</option>
          </select>
        </label>
        <label>
          Cidade:
          <input
            type='text'
            value={filtroCidade}
            onChange={e => setFiltroCidade(e.target.value)}
            placeholder='Digite a cidade'
          />
        </label>
        <label>
          Status:
          <select value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
            <option value=''>Todos</option>
            <option value='online'>Online</option>
            <option value='offline'>Offline</option>
          </select>
        </label>
      </div>

      <div id='informacoesGerais'>
        <div id='informacoes'>
          <h2>Informações</h2>
          <p>Clientes Online: {quantOnline}</p>
          <p>Clientes Offline: {quantOffline}</p>
          <p>Total Receita: R$ {totalReceita.toFixed(2)}</p>
          <p>Consumo Total Download: {consumoTotalDownload.toFixed(2)} TB</p>
          <p>Consumo Total Upload: {consumoTotalUpload.toFixed(2)} TB</p>
          <p>Média de Tempo Conectado: {mediaTempoConectado.toFixed(2)} horas</p>
        </div>
        {Object.keys(clientesPorPlano).length > 0 && (
          <div>
            <h2>Clientes por Plano:</h2>
            {Object.keys(clientesPorPlano).map((plano) => (
              <p key={plano}>
                {plano}: {clientesPorPlano[plano]}
              </p>
            ))}
          </div>
        )}
        {Object.keys(clientesPorCidade).length > 0 && (
          <div>
            <h2>Clientes por Cidade:</h2>
            {Object.keys(clientesPorCidade).map((cidade) => (
              <p key={cidade}>
                {cidade}: {clientesPorCidade[cidade].online} online, {clientesPorCidade[cidade].offline} offline
              </p>
            ))}
          </div>
        )}
        {Object.keys(clientesPorConcentrador).length > 0 && (
          <div>
            <h2>Clientes por Concentrador:</h2>
            {Object.keys(clientesPorConcentrador).map((concentrador) => (
              <p key={concentrador}>
                {concentrador}: {clientesPorConcentrador[concentrador].online} online, {clientesPorConcentrador[concentrador].offline} offline
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InformacoesGerais;
