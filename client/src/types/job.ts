export type Job = {
  _id: string,
  company: string,
  role: string,
  status: string,
  description: string
}

export type CreateNewJobInput = {
    company: string,
    role: string,
    status: string,
    description: string,
}

// Data being updated
export type UpdateJobData = {
    company?: string,
    role?: string,
    status?: string,
    description?: string
}

export type UpdateJobRequest = {
    id: string;
    data: UpdateJobData
}