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
      const response = await fetch('http://localhost:5000/api/submissions');
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching data:', error);
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
