import React, { useState } from 'react';
import ChecklistForm from './components/ChecklistForm';
import ChecklistTable from './components/ChecklistTable';

const App = () => {
    const [view, setView] = useState('home');
    const [editingChecklistId, setEditingChecklistId] = useState(null);

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
                        onReturnHome={() => { setView('home'); setEditingChecklistId(null); }}
                    />
                </div>
            )}
            {view === 'tabela' && (
                <div>
                    <button onClick={() => setView('home')}>Voltar</button>
                    <ChecklistTable onReopenChecklist={handleReopenChecklist} />
                </div>
            )}
        </div>
    );
};

export default App;
