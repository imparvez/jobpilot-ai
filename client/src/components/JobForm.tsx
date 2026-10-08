import React from 'react';

type JobFormProps = {
    company: string,
    role: string,
    status: string,
    description: string,
    isEditOn: boolean,

    setCompany: (value: string) => void,
    setRole: (value: string) => void;
    setStatus: (value: string) => void;
    setDescription: (value: string) => void;

    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    updateJob: () => void;
    handleCancelEdit: () => void;
}

const JobForm = ({
    handleSubmit,
    setCompany,
    setRole,
    setStatus,
    setDescription,
    company,
    role,
    status,
    description,
    isEditOn,
    updateJob,
    handleCancelEdit
}: JobFormProps) => {
    return (
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

          <textarea
            placeholder='Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {isEditOn ? (
            <>
              <button type="button" onClick={updateJob}>
                Update
              </button>

              <button
                type="button"
                onClick={handleCancelEdit}
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
    )
}

export default JobForm;