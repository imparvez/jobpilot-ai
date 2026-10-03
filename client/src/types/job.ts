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

export type UpdateJobInput = {
    id: string;
    company: string,
    role: string,
    status: string,
}