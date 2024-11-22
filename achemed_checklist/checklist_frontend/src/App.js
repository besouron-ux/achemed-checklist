import React, { useState, useEffect } from "react";
import ChecklistForm from "./components/ChecklistForm.js";
import ChecklistTable from "./components/ChecklistTable.js";
import axios from "axios";
import "./App.css";
import logo from "./assets/logo.png"; // Importando a logo

function App() {
  const [view, setView] = useState("home");
  const [editingChecklistId, setEditingChecklistId] = useState(null);
  const [checklistData, setChecklistData] = useState(null);

  // Carregar os dados do checklist quando o checklistId for definido
  useEffect(() => {
    if (editingChecklistId !== null) {
      axios
        .get(`http://localhost:8000/api/checklists/${editingChecklistId}`)
        .then((response) => {
          setChecklistData(response.data);
        });
    }
  }, [editingChecklistId]);

  const handleReopenChecklist = (id) => {
    setEditingChecklistId(id);
    setView("checklist");
  };

  return (
    <div className="App">
      {/* Header com a logo e o título "Checklist" */}
      <header className="App-header">
        <img src={logo} alt="Logo Achemed" className="App-logo" />
        <h1>Checklist</h1>
      </header>

      <main className="App-content">
        {view === "home" && (
          <div className="App-buttons">
            <button className="App-button" onClick={() => setView("checklist")}>
              Acessar Checklist
            </button>
            <button className="App-button" onClick={() => setView("tabela")}>
              Ver Checklists Antigos
            </button>
          </div>
        )}

        {view === "checklist" && (
          <div>
            <button
              className="App-button"
              onClick={() => {
                setView("home");
                setEditingChecklistId(null);
              }}
            >
              Voltar
            </button>
            <ChecklistForm
              checklistId={editingChecklistId}
              checklistData={checklistData}
              onReturnHome={() => {
                setView("home");
                setEditingChecklistId(null);
              }}
            />
          </div>
        )}

        {view === "tabela" && (
          <div>
            <button className="App-button" onClick={() => setView("home")}>
              Voltar
            </button>
            <ChecklistTable
              setChecklistId={setEditingChecklistId}
              setCurrentView={setView}
            />
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2024 Achemed Saúde. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
