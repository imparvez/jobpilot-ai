import { useEffect, useState } from 'react'
import './App.css'
import type { Job } from './types/job';
import JobCard from './components/JobCard';
import JobForm from './components/JobForm';
import { createNewJob, deleteJob, getJobs, updateJob } from './services/jobService';

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [isEditOn, setIsEditOn] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  const loadJobs = async () => {
    const jobs = await getJobs();
    setJobs(jobs);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newJob = await createNewJob({company, role, status});
    if(newJob) {

      setJobs((prevJobs) => [
        ...prevJobs,
        newJob
      ]);

      setCompany('');
      setRole('');
      setStatus('');
    }
  }

  const handleDelete = async (id: string) => {
    const response = await deleteJob(id);

    if(response) {
      loadJobs();
    }
  }

  const handleEdit = (job: Job) => {
    const {
      _id,
      company,
      role,
      status
    } = job;
    setIsEditOn(true);
    setEditingJobId(_id);

    setCompany(company);
    setRole(role);
    setStatus(status);
  }

  const handleCancelEdit = () => {
    setIsEditOn(false);
    setEditingJobId(null);
    setCompany('');
    setRole('');
    setStatus('');
  }

  const handleUpdateJob = async () => {
    if(!editingJobId) {
      return;
    }

    const jobUpdated = await updateJob({
      id: editingJobId, 
      data: { 
        company, role, status 
      }
    });

    if (jobUpdated) {
      loadJobs();

      setCompany('');
      setRole('');
      setStatus('');

      setIsEditOn(false);
      setEditingJobId(null);
    }
  }

  return (
    <div>
        <h1>JobPilot AI</h1>

        <h2>My Jobs</h2>

        {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
        ))}

        <JobForm
          handleSubmit={handleSubmit}
          setCompany={setCompany}
          setRole={setRole}
          setStatus={setStatus}
          company={company}
          role={role}
          status={status}
          isEditOn={isEditOn}
          updateJob={handleUpdateJob}
          handleCancelEdit={handleCancelEdit}
        />
    </div>
  )
}

export default App
