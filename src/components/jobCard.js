import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { fetchJobs } from '../network/api';
import { deleteJob } from '../network/api';
import ModelBox from './modelBox';
import HeroSection from './heroSection';

function JobCard() {
    const [jobs, setJobs] = useState([]);
    const [editJobId, setEditJobId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        async function fetchAllJobs() {
            try {
                const jobData = await fetchJobs();
                setJobs(jobData)
                console.log('Feach Job Data', jobs)
            } catch (error) {
                console.log('Error feacthing jobs', error)
            }
        }
        fetchAllJobs();
    }, [])

    // Delete Job Details;
    const handleDelete = async (jobId) => {
        try {
            await deleteJob(jobId);
            setJobs(jobs.filter(job => job.id !== jobId));
            alert('Job Post Deleted')
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };
    // Edit Job Details;
    const handleEdit = (jobId) => {
        const selectedJob = jobs.find(job => job.id === jobId);
        setEditJobId(selectedJob);
        setIsOpen(true)
    };

    // Filtering by seach;
    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <JobCard1>
                <HeroSection setSearchTerm={setSearchTerm} />
                <div className='jobCard grid grid-cols-1 md:grid-cols-2 gap-14 mt-10 px-12 py-8'>
                    {filteredJobs.map((job) => (
                        <div key={job.id} className='card bg-white  p-4 rounded-lg'>
                            <div className='flex justify-between'>
                                <div className='flex gap-2'>
                                    <img src='/images/cardLogo.png' alt='logo' className='w-12 h-12' />
                                    <div>
                                        <h3 className='text-2xl'>{job.title}</h3>
                                        <div className='text-[20px]'>
                                            <p className=''>{job.companyName} - {job.industry}</p>
                                            <p className='cardLocation'>{job.location} ({job.remoteType})</p>
                                        </div>
                                        <div className='mt-4 text-[20px]'>
                                            {/* <p>{job.employmentType}</p> */}
                                            <p>Part - Time (9:00 am - 5:00 pm IST)</p>
                                            <p>Expirence ({job.experience[0]} - {job.experience[1]} years)</p>
                                            <p>INR (₹) {job.salary[0]} - {job.salary[1]} / Month</p>
                                            <p>51 - 200 employees</p>
                                        </div>
                                    </div>

                                </div>

                                <div className='flex gap-4'>
                                    {/* Pencil Icon */}
                                    <svg
                                        onClick={() => handleEdit(job.id)}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24"
                                        strokeWidth={1.5} stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                    {editJobId && <ModelBox isOpen={setIsOpen} onClose={handleClose} editJobId={editJobId} />}


                                    {/* Detele icon */}
                                    <svg onClick={() => handleDelete(job.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </div>

                            </div>
                            <div className=" flex gap-4 px-10 mt-4">
                                <button
                                    style={{ backgroundColor: '#1597E4' }}
                                    type="button"
                                    className="shadow-md inline-flex justify-center rounded-md px-4 py-2 text-white"
                                >
                                    Apply Now
                                </button>

                                <button
                                    style={{ border: '2px solid #1597E4', color: '#1597E4' }}
                                    type="button"
                                    className="shadow-md inline-flex justify-center rounded-md px-4 py-2 text-white"
                                >
                                    {job.applyType}
                                </button>

                            </div>
                        </div>
                    ))}


                </div>
            </JobCard1>

        </>
    )
}

export default JobCard;

const JobCard1 = styled.div`
.jobCard{
    background-color: var(--jobCardBG); 
}
.cardLocation{
    color: var(--placeholder);
}
.card:hover {
    box-shadow: 0 10px 20px rgb(0 0 0 / 0.2);
    transition: 0.4s;
}

`