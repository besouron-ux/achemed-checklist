import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ConsultoriosPage = () => {
  const { clienteId } = useParams();
  const navigate = useNavigate();
  const [consultorios, setConsultorios] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/clientes/${clienteId}/consultorios/`)
      .then((response) => {
        setConsultorios(response.data);
      })
      .catch((error) =>
        console.error("Erro ao carregar consultórios:", error)
      );
  }, [clienteId]);

  return (
    <div className="consultorios-page">
      <h2>Consultórios</h2>
      <ul>
        {consultorios.map((consultorio) => (
          <li key={consultorio.id}>
            <button
              onClick={() =>
                navigate(`/consultorios/${consultorio.id}/checklist/`)
              }
            >
              {consultorio.nome}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConsultoriosPage;
