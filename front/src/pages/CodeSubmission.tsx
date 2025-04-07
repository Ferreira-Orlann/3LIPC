import React, { useState } from 'react';
import './CodeSubmission.css';

const CodeSubmission = () => {
  const [course, setCourse] = useState('');
  const [exercise, setExercise] = useState('');
  const [language, setLanguage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!course || !exercise || !language || !file) {
      alert('Merci de remplir tous les champs et de téléverser un fichier.');
      return;
    }
  
    const formData = new FormData();
    formData.append('course', course);
    formData.append('exercise', exercise);
    formData.append('language', language);
    formData.append('file', file);
  
    try {
      const response = await fetch('http://localhost:5173/', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        alert('Fichier soumis avec succès !');
      } else {
        const errorData = await response.json();
        alert(`Erreur : ${errorData.message || 'soumission échouée'}`);
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
      alert("Une erreur est survenue lors de l'envoi du fichier.");
    }
  };
  

  return (
    <div className="wrapper">
      <h1 className="title">Soumission de Code</h1>

      <div className="group">
        <label htmlFor="course" className="label">Cours</label>
        <select
          id="course"
          className="input"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="">Choisir un cours</option>
          <option value="course1">Cours 1</option>
          <option value="course2">Cours 2</option>
        </select>
      </div>

      <div className="group">
        <label htmlFor="exercise" className="label">Exercice</label>
        <select
          id="exercise"
          className="input"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        >
          <option value="">Choisir un exercice</option>
          <option value="exercise1">Exercice 1</option>
          <option value="exercise2">Exercice 2</option>
        </select>
      </div>

      <div className="group">
        <label htmlFor="language" className="label">Langage</label>
        <select
          id="language"
          className="input"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="">Choisir un langage</option>
          <option value="python">Python</option>
          <option value="c">C</option>
        </select>
      </div>

      <div className="group">
        <label htmlFor="file" className="label">Fichier</label>
        <input
          type="file"
          id="file"
          className="input"
          onChange={handleFileChange}
        />
      </div>

    <div className="actions">
        <button className="button" onClick={handleSubmit}>
        Soumettre
        </button>
    </div>
    </div>
);
};

export default CodeSubmission;
