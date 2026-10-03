import type { Job, CreateNewJobInput, UpdateJobRequest } from "../types/job";

const base_url = 'http://localhost:3000';
const jobs = 'jobs';

export const getJobs = async (): Promise<Job[]> => {
    const response = await fetch(`${base_url}/${jobs}`)
    const data = await response.json();
    return data.jobs;
}

export const createNewJob = async ({ company, role, status }: CreateNewJobInput): Promise<Job> => {
    const response = await fetch(`${base_url}/${jobs}`, {
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

    return data.job;
}

export const deleteJob = async (id: string): Promise<boolean> => {
    const response = await fetch(`${base_url}/${jobs}/${id}`, {
        method: 'DELETE'
    });

    return response.ok
}

export const updateJob = async (
    { id, data }: UpdateJobRequest
): Promise<boolean> => {
    const response = await fetch(`${base_url}/${jobs}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    return response.ok;
};