export type Job = {
  _id: string,
  company: string,
  role: string,
  status: string,
}

export type CreateNewJobInput = {
    company: string,
    role: string,
    status: string,
}

// Data being updated
export type UpdateJobData = {
    company?: string,
    role?: string,
    status?: string,
}

export type UpdateJobRequest = {
    id: string;
    data: UpdateJobData
}