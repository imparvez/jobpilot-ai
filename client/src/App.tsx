import { useEffect, useState } from 'react'
import './App.css'


type Job = {
  _id: string,
  company: string,
  role: string,
  status: string,
}

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [isEditOn, setIsEditOn] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);

  const getJobs = () => {
    fetch('http://localhost:3000/jobs')
      .then((response) => response.json())
      .then((data) => setJobs(data.jobs));
  }

  useEffect(() => {
    getJobs();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company,
        role,
        status
      })
    });

    const data = await response.json();

    if(response.ok) {

      setJobs((prevJobs) => [
        ...prevJobs,
        data.job
      ]);

      setCompany('');
      setRole('');
      setStatus('');
    }
  }

  const handleDelete = async (id: string) => {
    const response = await fetch(`http://localhost:3000/jobs/${id}`, {
      method: 'DELETE'
    });

    if(response.ok) {
      getJobs();
    }
  }

  const handleEdit = (id: string, company: string, role: string, status: string) => {
    setIsEditOn(true);
    setEditingJobId(id);

    setCompany(company);
    setRole(role);
    setStatus(status);
  }

  const updateJob = async () => {
    if(!editingJobId) {
      return;
    }

    const response = await fetch(`http://localhost:3000/jobs/${editingJobId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company,
        role,
        status
      })
    });

    if (response.ok) {
      getJobs();

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
            <div key={job._id}>
                <h3>{job.role}</h3>
                <p>{job.company}</p>
                <p>Status: {job.status}</p>
                <button onClick={() => handleEdit(job._id, job.company, job.role, job.status)}>Edit/Update</button>
                <button onClick={() => handleDelete(job._id)}>Delete</button>
            </div>
        ))}

        <form onSubmit={handleSubmit}>
          <h2>Add Job</h2>

          <input
            type='text'
            placeholder='Company'
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            type='text'
            placeholder='Role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value=''>Select Status</option>
            <option value="NEW">New</option>
            <option value="APPLIED">Applied</option>
            <option value="INTERVIEW">Interview</option>
            <option value="REJECTED">Rejected</option>
          </select>

          {isEditOn ? (
            <>
              <button type="button" onClick={updateJob}>
                Update
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEditOn(false);
                  setEditingJobId(null);
                  setCompany('');
                  setRole('');
                  setStatus('');
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button type="submit">
              Add
            </button>
          )}
        </form>
    </div>
  )
}

export default App
