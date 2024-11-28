import React, { useState, useEffect } from "react";
import ChecklistForm from "./components/ChecklistForm.js";
import ChecklistTable from "./components/ChecklistTable.js";
import axios from "axios";
import "./App.css";
import logo from "./assets/logo.png"; // Importando a logo
import ClientesPage from "./components/ClientesPage";

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
        })
        .catch((error) => console.error("Erro ao carregar checklist:", error));
    }
  }, [editingChecklistId]);

  const handleNavigate = (targetView) => {
    setView(targetView);
    if (targetView === "home") {
      setEditingChecklistId(null);
    }
  };

  return (
    <div className="App">
      {/* Header com a logo e o título "Checklist" */}
      <header className="App-header">
        <img src={logo} alt="Logo Achemed" className="App-logo" />
        <h1>Checklist Técnico</h1>
      </header>

      <main className="App-content">
        {view === "home" && (
          <div className="App-buttons">
            <button
              className="App-button"
              onClick={() => handleNavigate("checklist")}
            >
              Acessar Checklist
            </button>
            <button
              className="App-button"
              onClick={() => handleNavigate("clientes")}
            >
              Clientes
            </button>
          </div>
        )}

        {view === "checklist" && (
          <div>
            <button
              className="App-button"
              onClick={() => handleNavigate("home")}
            >
              Voltar
            </button>
            <ChecklistForm
              checklistId={editingChecklistId}
              checklistData={checklistData}
              onReturnHome={() => handleNavigate("home")}
            />
          </div>
        )}

        {view === "clientes" && (
          <div>
            <button
              className="App-button"
              onClick={() => handleNavigate("home")}
            >
              Voltar
            </button>
            <ClientesPage
              onClientSelected={(clientId) => {
                setEditingChecklistId(clientId); // Associa o cliente ao checklist
                handleNavigate("checklist");
              }}
            />
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2024 Achemed. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;