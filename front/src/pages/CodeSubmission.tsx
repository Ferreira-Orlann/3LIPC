import React, { useEffect, useState } from 'react';
import './CodeSubmission.css';
import { submitCodeJob, getExercises } from '../api/api.ts';
import { useNavigate } from 'react-router-dom';

const CodeSubmission = () => {
  const [course, setCourse] = useState('');
  const [exercise, setExercise] = useState('');
  const [language, setLanguage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [exercises, setExercises] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercises();
        console.log(data);
        setExercises(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des exercices :', error);
      }
    };

    fetchExercises();
  }, []);

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

    try {
    await submitCodeJob(course, exercise, file);
    alert('Fichier soumis avec succès !');
    navigate('/');
  } catch (error: any) {
    alert(`Erreur : ${error.message}`);
  }
  };

  return (
    <div className="CodeSubmission">
        <div className="body">
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
                  {exercises.map((ex: any) => (
                    <option key={ex.uuid} value={ex.uuid}>
                      {ex.name || ex.title || ex.uuid}
                    </option>
                  ))}
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
          </div>
        </div>
  );
};

export default CodeSubmission;
