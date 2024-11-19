import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChecklistTable = ({ onReopenChecklist }) => {
    const [checklistsAptos, setChecklistsAptos] = useState([]);
    const [checklistsNaoAptos, setChecklistsNaoAptos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChecklists = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/checklists/');
                const data = response.data;

                // Separar os checklists em APTOs e NÃO APTOs
                const aptos = data.filter(item => item.status === 'APTO');
                const naoAptos = data.filter(item => item.status === 'NÃO APTO');

                setChecklistsAptos(aptos);
                setChecklistsNaoAptos(naoAptos);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar os checklists:', error);
                setLoading(false);
            }
        };

        fetchChecklists();
    }, []);

    if (loading) {
        return <p>Carregando tabelas...</p>;
    }

    if (checklistsAptos.length === 0 && checklistsNaoAptos.length === 0) {
        return <p>Nenhuma tabela disponível.</p>;
    }

    return (
        <div>
            <h2>Tabelas de Checklists</h2>

            {checklistsAptos.length > 0 && (
                <div>
                    <h3>Checklists APTOs</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Consultório</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checklistsAptos.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.cliente}</td>
                                    <td>{item.consultorio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {checklistsNaoAptos.length > 0 && (
                <div>
                    <h3>Checklists NÃO APTOs</h3>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Consultório</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checklistsNaoAptos.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.cliente}</td>
                                    <td>{item.consultorio}</td>
                                    <td>
                                        <button onClick={() => onReopenChecklist(item.id)}>Reabrir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ChecklistTable;
