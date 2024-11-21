import React, { useState, useEffect } from "react";
import axios from "axios";

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

    const handleUpdateChecklist = (checklistId, status) => {
        setChecklists((prevChecklists) =>
            prevChecklists.map((checklist) =>
                checklist.id === checklistId ? { ...checklist, status } : checklist
            )
        );
    };

    return (
        <div>
            <h2>APTOs</h2>
            <table>
                {checklists
                    .filter((item) => item.status === "APTO")
                    .map((checklist) => (
                        <tr key={checklist.id}>
                            <td>{checklist.cliente}</td>
                            <td>{checklist.consultorio}</td>
                        </tr>
                    ))}
            </table>

            <h2>NÃO APTOS</h2>
            <table>
                {checklists
                    .filter((item) => item.status === "NÃO APTO")
                    .map((checklist) => (
                        <tr key={checklist.id}>
                            <td>{checklist.cliente}</td>
                            <td>{checklist.consultorio}</td>
                            <td>
                                <button onClick={() => handleReabrir(checklist)}>Reabrir</button>
                            </td>
                        </tr>
                    ))}
            </table>
        </div>
    );
};

export default ChecklistTable;
