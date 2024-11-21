import React, { useState, useEffect } from "react";
import axios from "axios";

const ChecklistForm = ({ checklistId, onReturnHome }) => {
    const [formData, setFormData] = useState({
        cliente: "",
        consultorio: "",
        processador: false,
        ram: false,
        armazenamento: false,
        sistema: false,
        monitor: false,
        webcam: false,
        microfone: false,
        autoFalantes: false,
        internet: false,
        navegador: false,
    });

    const [showModal, setShowModal] = useState(checklistId === null);

    // Carregar checklist para edição, caso haja um ID
    useEffect(() => {
        if (checklistId) {
            axios
                .get(`http://localhost:8000/api/checklists/${checklistId}/`)
                .then((response) => {
                    // Corrigir valores para garantir consistência
                    const checklistData = response.data;
                    setFormData({
                        cliente: checklistData.cliente || "",
                        consultorio: checklistData.consultorio || "",
                        processador: !!checklistData.processador,
                        ram: !!checklistData.ram,
                        armazenamento: !!checklistData.armazenamento,
                        sistema: !!checklistData.sistema,
                        monitor: !!checklistData.monitor,
                        webcam: !!checklistData.webcam,
                        microfone: !!checklistData.microfone,
                        autoFalantes: !!checklistData.autoFalantes,
                        internet: !!checklistData.internet,
                        navegador: !!checklistData.navegador,
                    });
                    setShowModal(false);
                })
                .catch((error) => console.error("Erro ao carregar checklist:", error));
        }
    }, [checklistId]);

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar se todos os campos estão preenchidos (exceto cliente e consultório)
        const isApto = Object.values(formData)
            .slice(2) // Ignorar "cliente" e "consultorio"
            .every((value) => value);

        try {
            if (checklistId) {
                // Atualizar checklist existente
                await axios.put(`http://localhost:8000/api/checklists/${checklistId}/`, {
                    ...formData,
                    status: isApto ? "APTO" : "NÃO APTO",
                });
            } else {
                // Criar novo checklist
                await axios.post("http://localhost:8000/api/checklists/", {
                    ...formData,
                    status: isApto ? "APTO" : "NÃO APTO",
                });
            }

            alert("Checklist salvo com sucesso!");
            onReturnHome(checklistId, isApto ? "APTO" : "NÃO APTO");
        } catch (error) {
            console.error("Erro ao salvar o checklist:", error);
            alert("Erro ao salvar o checklist.");
        }
    };

    return (
        <div>
            {showModal && (
                <div className="modal">
                    <h2>Informações Iniciais</h2>
                    <label>
                        Cliente:
                        <input
                            type="text"
                            name="cliente"
                            value={formData.cliente}
                            onChange={handleInputChange}
                            disabled={checklistId !== null}
                        />
                    </label>
                    <label>
                        Consultório:
                        <input
                            type="text"
                            name="consultorio"
                            value={formData.consultorio}
                            onChange={handleInputChange}
                            disabled={checklistId !== null}
                        />
                    </label>
                    <button onClick={() => setShowModal(false)}>Continuar</button>
                </div>
            )}

            {!showModal && (
                <form onSubmit={handleSubmit}>
                    <h2>Checklist</h2>
                    {[
                        "processador",
                        "ram",
                        "armazenamento",
                        "sistema",
                        "monitor",
                        "webcam",
                        "microfone",
                        "autoFalantes",
                        "internet",
                        "navegador",
                    ].map((item) => (
                        <div key={item}>
                            <label>
                                <input
                                    type="checkbox"
                                    name={item}
                                    checked={formData[item] || false}
                                    onChange={handleInputChange}
                                />
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                            </label>
                        </div>
                    ))}
                    <button type="submit">Submeter</button>
                </form>
            )}
        </div>
    );
};

export default ChecklistForm;
