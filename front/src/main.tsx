import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JobList from './pages/JobList';
import CodeSubmission from './pages/CodeSubmission';


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<JobList />} />
                <Route path="/submit" element={<CodeSubmission />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
