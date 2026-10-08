import type { Job } from '../types/job'

type JobCardProps = {
    job: Job,
    onEdit: (job: Job) => void;
    onDelete: (id: string) => void
}

const JobCard = ({
    job,
    onEdit,
    onDelete
}: JobCardProps) => {
    return (
        <div key={job._id}>
            <h3>{job.role}</h3>
            <p>{job.company}</p>
            <p>Status: {job.status}</p>
            <p>Description: {job.description}</p>
            <button onClick={() => onEdit(job)}>Edit/Update</button>
            <button onClick={() => onDelete(job._id)}>Delete</button>
        </div>
    )
}

export default JobCard