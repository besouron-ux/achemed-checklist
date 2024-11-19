import React, { useState } from 'react';
import axios from 'axios';

const ChecklistForm = ({ checklistId, onReturnHome }) => {
    const [formData, setFormData] = useState({
        cliente: '',
        consultorio: '',
        processador: false,
        memoriaRAM: false,
        armazenamento: false,
        sistemaOperacional: false,
        monitor: false,
        webcam: false,
        microfone: false,
        altoFalantes: false,
        conexaoInternet: false,
        navegador: false,
    });

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const allChecked = Object.keys(formData).every(
            (key) =>
                key === 'cliente' ||
                key === 'consultorio' ||
                (typeof formData[key] === 'boolean' && formData[key])
        );
    
        const status = allChecked ? 'APTO' : 'NÃO APTO';
    
        try {
            const response = await axios.post('http://localhost:8000/api/checklists/', {
                ...formData,
                status,
            });
            alert('Checklist submetido com sucesso!');
            console.log('Resposta do servidor:', response.data);
            onReturnHome();
        } catch (error) {
            console.error('Erro ao submeter o checklist:', error);
            if (error.response) {
                console.error('Erro do backend:', error.response.data);
                alert(`Erro ao submeter: ${JSON.stringify(error.response.data)}`);
            } else {
                alert('Erro ao submeter. Verifique a conexão com o backend.');
            }
        }
    };    

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Cliente:</label>
                <input
                    type="text"
                    name="cliente"
                    value={formData.cliente}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Consultório:</label>
                <input
                    type="text"
                    name="consultorio"
                    value={formData.consultorio}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Processador Intel Core i3 ou Ryzen 3:</label>
                <input
                    type="checkbox"
                    name="processador"
                    checked={formData.processador}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Memória RAM 4 GB (mínimo):</label>
                <input
                    type="checkbox"
                    name="memoriaRAM"
                    checked={formData.memoriaRAM}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Armazenamento 100GB (mínimo):</label>
                <input
                    type="checkbox"
                    name="armazenamento"
                    checked={formData.armazenamento}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Sistema Operacional Windows 10:</label>
                <input
                    type="checkbox"
                    name="sistemaOperacional"
                    checked={formData.sistemaOperacional}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Monitor:</label>
                <input
                    type="checkbox"
                    name="monitor"
                    checked={formData.monitor}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>WebCam:</label>
                <input
                    type="checkbox"
                    name="webcam"
                    checked={formData.webcam}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Microfone:</label>
                <input
                    type="checkbox"
                    name="microfone"
                    checked={formData.microfone}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Alto-Falantes:</label>
                <input
                    type="checkbox"
                    name="altoFalantes"
                    checked={formData.altoFalantes}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Conexão de Internet 10 Mbps:</label>
                <input
                    type="checkbox"
                    name="conexaoInternet"
                    checked={formData.conexaoInternet}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Navegador Chrome:</label>
                <input
                    type="checkbox"
                    name="navegador"
                    checked={formData.navegador}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Submeter</button>
        </form>
    );
};

export default ChecklistForm;
