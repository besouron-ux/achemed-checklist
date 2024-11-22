import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChecklistTable.css"; // Importar o arquivo CSS

const ChecklistTable = ({ setChecklistId, setCurrentView }) => {
    const [checklists, setChecklists] = useState([]);

    const fetchChecklists = () => {
        axios.get("http://localhost:8000/api/checklists/").then((response) => {
            setChecklists(response.data);
        });
    };

    useEffect(() => {
        fetchChecklists();
    }, []);

    const handleReabrir = (checklist) => {
        setChecklistId(checklist.id);
        setCurrentView("checklist");
    };

    const handleClearAptos = () => {
        const aptoIds = checklists
            .filter((item) => item.status === "APTO")
            .map((item) => item.id);

        if (aptoIds.length > 0) {
            axios
                .delete("http://localhost:8000/api/checklists/clear_aptos", {
                    data: { ids: aptoIds },
                })
                .then(() => {
                    // Atualiza os checklists localmente após a exclusão
                    fetchChecklists();
                })
                .catch((error) => {
                    console.error("Erro ao limpar os checklists aptos:", error);
                });
        } else {
            alert("Não há checklists aptos para limpar!");
        }
    };

    return (
        <div className="table-container">
            <h2>APTOs</h2>
            <button className="clear-button" onClick={handleClearAptos}>
                Limpar Aptos
            </button>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Consultório</th>
                    </tr>
                </thead>
                <tbody>
                    {checklists
                        .filter((item) => item.status === "APTO")
                        .map((checklist) => (
                            <tr key={checklist.id}>
                                <td>{checklist.cliente}</td>
                                <td>{checklist.consultorio}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <h2>NÃO APTOS</h2>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Consultório</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {checklists
                        .filter((item) => item.status === "NÃO APTO")
                        .map((checklist) => (
                            <tr key={checklist.id}>
                                <td>{checklist.cliente}</td>
                                <td>{checklist.consultorio}</td>
                                <td>
                                    <button onClick={() => handleReabrir(checklist)}>
                                        Reabrir
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default ChecklistTable;
