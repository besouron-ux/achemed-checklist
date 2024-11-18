import React, { useState } from 'react';
import axios from 'axios';

const ChecklistForm = () => {
    const [formData, setFormData] = useState({
        cliente: '',
        consultorio: '',
        processador: false,
        memoria_ram: false,
        armazenamento: false,
        sistema_operacional: false,
        monitor: false,
        webcam: false,
        microfone: false,
        alto_falantes: false,
        conexao_internet: false,
        navegador: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/checklists/', formData);
            alert('Checklist submetido com sucesso!');
        } catch (error) {
            console.error('Erro ao submeter o checklist:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Cliente:</label>
            <input type="text" name="cliente" value={formData.cliente} onChange={handleChange} required />

            <label>Consultório:</label>
            <input type="text" name="consultorio" value={formData.consultorio} onChange={handleChange} required />

            <div>
                <label>Processador:</label>
                <input type="checkbox" name="processador" checked={formData.processador} onChange={handleChange} />
            </div>
            <div>
                <label>Memória RAM:</label>
                <input type="checkbox" name="memoria_ram" checked={formData.memoria_ram} onChange={handleChange} />
            </div>
            <div>
                <label>Armazenamento:</label>
                <input type="checkbox" name="armazenamento" checked={formData.armazenamento} onChange={handleChange} />
            </div>
            <div>
                <label>Sistema Operacional:</label>
                <input type="checkbox" name="sistema_operacional" checked={formData.sistema_operacional} onChange={handleChange} />
            </div>
            <div>
                <label>Monitor:</label>
                <input type="checkbox" name="monitor" checked={formData.monitor} onChange={handleChange} />
            </div>
            <div>
                <label>Webcam:</label>
                <input type="checkbox" name="webcam" checked={formData.webcam} onChange={handleChange} />
            </div>
            <div>
                <label>Microfone:</label>
                <input type="checkbox" name="microfone" checked={formData.microfone} onChange={handleChange} />
            </div>
            <div>
                <label>Alto-falantes:</label>
                <input type="checkbox" name="alto_falantes" checked={formData.alto_falantes} onChange={handleChange} />
            </div>
            <div>
                <label>Conexão de Internet:</label>
                <input type="checkbox" name="conexao_internet" checked={formData.conexao_internet} onChange={handleChange} />
            </div>
            <div>
                <label>Navegador Chrome:</label>
                <input type="checkbox" name="navegador" checked={formData.navegador} onChange={handleChange} />
            </div>
            <button type="submit">Submeter</button>
        </form>
    );
};

export default ChecklistForm;
