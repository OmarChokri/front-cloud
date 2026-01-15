import React, { useState, useEffect } from 'react';
import './App.css';
import FormComponent from './components/FormComponent';
import DataDisplay from './components/DataDisplay';

function App() {
  const [submissions, setSubmissions] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    // Fetch data from backend
    fetchData();
  }, [refreshTrigger]);

const fetchData = async () => {
    try {
      // 1. Appel API en utilisant la variable d'environnement
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/submissions`);

      // 2. Vérification du statut de la réponse (résout le warning 'unused response')
      if (!response.ok) {
        throw new Error(`Serveur Erreur: ${response.status} ${response.statusText}`);
      }

      // 3. Extraction des données
      const data = await response.json();
      
      // 4. Mise à jour de l'état
      setSubmissions(data);

    } catch (error) {
      // 5. Gestion des erreurs (très important pour le debug sur AWS)
      console.error('Erreur lors de la récupération des données:', error);
      // Optionnel : afficher une alerte ou un message à l'utilisateur ici
    }
  };
  const handleFormSubmit = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>📋 Formulaire Simple</h1>
        <FormComponent onSubmit={handleFormSubmit} />
        <DataDisplay submissions={submissions} />
      </div>
    </div>
  );
}

export default App;
