import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobList.css';
import {getJobStatus} from '../api/api.ts';

type Job = {
  id: number;
  name: string; // nom du job
  uuid: string;
  status: string;
  grade: number | null;
  publish_date: string;
  finish_data: string | null;
  completion_time: string | null;
  exercice: {
      id: number;
      uuid: string;
      name: string;
      class: string;
      exercice_number: string;
  }
};

const JobList = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getJobStatus();
                console.log(res)
                setJobs(res);
            } catch (err) {
                console.error('Erreur lors du chargement des jobs', err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="jobs">
            <h1 className="title">Liste des Jobs</h1>
            <div className="actions">
                <button className="button" onClick={() => navigate('/submit')}>
                    Soumettre un code
                </button>
            </div>

            {loading ? (
                <p>Chargement...</p>
            ) : (
                <table className="job-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Étudiant</th>
                            <th>Cours</th>
                            <th>Classe</th>
                            <th>Exercice</th>
                            <th>Langage</th>
                            <th>Statut</th>
                            <th>Note</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id}>
                                <td>{job.id}</td>
                                <td>{}</td>
                                <td>{job.name}</td>
                                <td>{job.exercice.class}</td>
                                <td>{job.exercice.name}</td>
                                <td></td>
                                <td>{job.status}</td>
                                <td>{job.grade !== undefined ? `${job.grade}%` : '—'}</td>
                                <td>{new Date(job.publish_date).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default JobList;
