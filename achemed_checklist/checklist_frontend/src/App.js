import React, { useState, useEffect } from 'react';
import ChecklistForm from './components/ChecklistForm.js';
import ChecklistTable from './components/ChecklistTable.js';
import axios from 'axios';

function App() {
  const [view, setView] = useState('home');
  const [editingChecklistId, setEditingChecklistId] = useState(null);
  const [checklistData, setChecklistData] = useState(null); // Armazenar dados do checklist reaberto

  // Carregar os dados do checklist quando o checklistId for definido
  useEffect(() => {
    if (editingChecklistId !== null) {
      axios.get(`http://localhost:8000/api/checklists/${editingChecklistId}`)
        .then((response) => {
          setChecklistData(response.data);
        });
    }
  }, [editingChecklistId]);

  const handleReopenChecklist = (id) => {
    setEditingChecklistId(id);
    setView('checklist');
  };

  return (
    <div>
      <h1>Achemed - Checklist</h1>
      {view === 'home' && (
        <div>
          <button onClick={() => setView('checklist')}>Checklist</button>
          <button onClick={() => setView('tabela')}>Tabela</button>
        </div>
      )}
      {view === 'checklist' && (
        <div>
          <button onClick={() => { setView('home'); setEditingChecklistId(null); }}>Voltar</button>
          <ChecklistForm
            checklistId={editingChecklistId}
            checklistData={checklistData} // Passando dados para o formulário
            onReturnHome={() => { setView('home'); setEditingChecklistId(null); }}
          />
        </div>
      )}
      {view === 'tabela' && (
        <div>
          <button onClick={() => setView('home')}>Voltar</button>
          <ChecklistTable 
            setChecklistId={setEditingChecklistId} // Atualizado para usar a função de reabrir
            setCurrentView={setView} 
          />
        </div>
      )}
    </div>
  );
}

export default App;
