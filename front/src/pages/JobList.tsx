import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobList.css';

type Job = {
    id: number;
    studentEmail: string;
    course: string;
    exercise: string;
    language: string;
    status: string;
    grade?: number;
    submittedAt: string;
};

const JobList = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/jobs');
                const data = await res.json();
                setJobs(data);
            } catch (err) {
                console.error('Erreur lors du chargement des jobs', err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="wrapper">
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
                                <td>{job.studentEmail}</td>
                                <td>{job.course}</td>
                                <td>{job.exercise}</td>
                                <td>{job.language}</td>
                                <td>{job.status}</td>
                                <td>{job.grade !== undefined ? `${job.grade}%` : '—'}</td>
                                <td>{new Date(job.submittedAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default JobList;
