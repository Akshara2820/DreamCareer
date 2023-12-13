import axios from 'axios';

const API_URL = 'https://6576b986424e2adad5b4840e.mockapi.io/api/dream_career/jobs/';

// Function to fetch all jobs
export const fetchJobs = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};

// Function to create a job
export const createJob = async (jobData) => {
    try {
        const response = await axios.post(API_URL, jobData);
        return response.data;
    } catch (error) {
        console.error('Error creating job:', error);
        throw error;
    }
};

// Function to update a job

export const updateJob = async (jobId, updatedJobData) => {
    try {
        const response = await axios.put(`${API_URL}/${jobId}`, updatedJobData);
        return response.data;
    } catch (error) {
        console.error('Error updating job:', error);
        throw error;
    }
};


// Function to delete a job
export const deleteJob = async (jobId) => {
    try {
        const response = await axios.delete(`${API_URL}/${jobId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting job:', error);
        throw error;
    }
};