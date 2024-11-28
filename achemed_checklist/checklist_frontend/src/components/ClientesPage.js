import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClientesPage.css"; // Adicione o CSS para estilização

const ClientesPage = ({ onClientSelected }) => {
  const [clientes, setClientes] = useState([]);
  const [novoCliente, setNovoCliente] = useState({ nome: "", cnpj: "", telefone: "" });
  const [consultorios, setConsultorios] = useState([]); // Para armazenar consultórios do cliente selecionado
  const [modalOpen, setModalOpen] = useState(false); // Controla o modal
  const [clienteSelecionado, setClienteSelecionado] = useState(null); // Armazena o cliente selecionado

  // Carregar lista de clientes ao montar o componente
  useEffect(() => {
    axios.get("http://localhost:8000/api/clientes/").then((response) => {
      setClientes(response.data);
    });
  }, []);

  // Função para buscar consultórios de um cliente
  const handleClienteClick = (clienteId) => {
    setClienteSelecionado(clienteId); // Atualiza o cliente selecionado

    axios
      .get(`http://localhost:8000/api/consultorios/${clienteId}/`) // Requisição para buscar consultórios
      .then((response) => {
        setConsultorios(response.data); // Atualiza a lista de consultórios
      })
      .catch((error) => {
        console.error("Erro ao carregar os consultórios:", error);
        setConsultorios([]); // Caso haja erro, limpa a lista de consultórios
      });
  };

  // Função para adicionar um novo consultório
  const handleAddConsultorio = (nome) => {
    setConsultorios((prev) => [...prev, nome]);
  };

  // Função para salvar o cliente e os consultórios
  const handleSaveCliente = () => {
    // Primeiro, salva o cliente
    axios
      .post("http://localhost:8000/api/clientes/", novoCliente)
      .then((response) => {
        const clienteId = response.data.id;
  
        // depois, salva os consultórios associados ao cliente
        const requests = consultorios.map((nome) =>
          axios.post("http://localhost:8000/api/consultorios/", {
            nome,
            cliente: clienteId, // Relaciona o consultório ao cliente criado
          })
        );
  
        // Aguarda a conclusão de todas as requisições de criação de consultórios
        Promise.all(requests)
          .then(() => {
            // Após salvar os consultórios, atualize a lista de clientes
            setClientes((prev) => [...prev, response.data]);
  
            // Limpa os campos e fecha o modal
            setNovoCliente({ nome: "", cnpj: "", telefone: "" });
            setConsultorios([]); // Limpa a lista de consultórios
            setModalOpen(false);
          })
          .catch((error) => {
            console.error("Erro ao salvar os consultórios:", error);
          });
      })
      .catch((error) => {
        console.error("Erro ao salvar cliente:", error);
      });
  };

  return (
    <div className="clientes-page">
      <h2>Clientes</h2>
      <button onClick={() => setModalOpen(true)} className="add-button">
        + Novo Cliente
      </button>
      <table className="clientes-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} onClick={() => handleClienteClick(cliente.id)}>
              <td>{cliente.nome}</td>
              <td>{cliente.cnpj}</td>
              <td>{cliente.telefone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {clienteSelecionado && (
        <div>
          <h3>Consultórios de {clientes.find(cliente => cliente.id === clienteSelecionado)?.nome}</h3>
          <ul>
            {consultorios.length > 0 ? (
              consultorios.map((consultorio, index) => (
                <li key={index}>{consultorio.nome}</li>
              ))
            ) : (
              <p>Não há consultórios cadastrados para este cliente.</p>
            )}
          </ul>
        </div>
      )}

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Novo Cliente</h3>
            <input
              type="text"
              placeholder="Nome"
              value={novoCliente.nome}
              onChange={(e) => setNovoCliente({ ...novoCliente, nome: e.target.value })}
            />
            <input
              type="text"
              placeholder="CNPJ"
              value={novoCliente.cnpj}
              onChange={(e) => setNovoCliente({ ...novoCliente, cnpj: e.target.value })}
            />
            <input
              type="text"
              placeholder="Telefone"
              value={novoCliente.telefone}
              onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
            />
            <button onClick={() => handleAddConsultorio(prompt("Nome do consultório"))}>
              Adicionar Consultório
            </button>
            <ul>
              {consultorios.map((consultorio, index) => (
                <li key={index}>{consultorio}</li>
              ))}
            </ul>
            <button onClick={handleSaveCliente}>Salvar Cliente</button>
            <button onClick={() => setModalOpen(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientesPage;
