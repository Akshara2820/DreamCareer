import React, { useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { createJob, updateJob } from '../network/api';


function ModelBox({ isOpen, onClose, editJobId }) {
    console.log('isOpen: ', isOpen);
    const [currentStep, setCurrentStep] = useState(1);

    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');
    const [remoteType, setRemoteType] = useState('');
    const [applyType, setApplyType] = useState('quick-apply');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    // error find field
    const [jobTitleError, setJobTitleError] = useState('');
    const [companyNameError, setCompanyNameError] = useState('');
    const [industryError, setIndustryError] = useState('');
    // step 2 fields
    const [minimumExperience, setMinimumExperience] = useState('');
    const [maximumExperience, setMaximumExperience] = useState('');
    const [totalExperience, setTotalExperience] = useState('')
    const [minimumSalary, setMinimumSalary] = useState('');
    const [maximumSalary, setMaximumSalary] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(1); // Reset to Step 1 when the modal is closed
        }
    }, [isOpen]);

    const openModal = (step) => {
        setCurrentStep(step);
    };

    const closeModal = () => {
        onClose(); // Call onClose to close the modal
    };

    // Required Field 

    const handleJobTitleChange = (event) => {
        const value = event.target.value;
        if (value.trim() !== '') {
            setJobTitleError(''); // Clear error message if field is not empty
        }
        setJobTitle(value);
    };

    const handleCompanyNameChange = (event) => {
        const value = event.target.value;
        if (value.trim() !== '') {
            setCompanyNameError('');
        }
        setCompanyName(value);
    };

    const handleIndustryChange = (event) => {
        const value = event.target.value;
        if (value.trim() !== '') {
            setIndustryError('');
        }
        setIndustry(value);

    };

    const handleLocationChange = (event) => {
        const value = event.target.value;
        setLocation(value);
    };

    const handleRemoteTypeChange = (event) => {
        const value = event.target.value;
        setRemoteType(value);
    };

    const handleExperienceChange = (event, field) => {

        const value = event.target.value;
        if (field === 'minimum') {
            setMinimumExperience(value);
        } else if (field === 'maximum') {
            setMaximumExperience(value);
        }
    };

    const handleTotalExperienceChange = (event) => {
        const value = event.target.value;
        setTotalExperience(value);
    }
    const handleSalaryChange = (event, field) => {
        const value = event.target.value;
        if (field === 'minimum') {
            setMinimumSalary(value);
        } else if (field === 'maximum') {
            setMaximumSalary(value);
        }
    };

    // Next Button ckeck Required Fields;
    const handleNextButtonClick = async () => {
        let isDisabled = false;

        if (jobTitle.trim() === '') {
            setJobTitleError('field is required');
            isDisabled = true;
        } else {
            setJobTitleError('');
        }

        if (companyName.trim() === '') {
            setCompanyNameError('field is required');
            isDisabled = true;
        } else {
            setCompanyNameError('');
        }

        if (industry.trim() === '') {
            setIndustryError('field is required');
            isDisabled = true;
        } else {
            setIndustryError('');
        }

        setIsButtonDisabled(isDisabled);

        if (!isDisabled) {
            openModal(2)
        }

    };


    // Create Job Data;
    const handelSaveData = async () => {
        const jobData = {
            title: jobTitle,
            companyName: companyName,
            industry: industry,
            location: location,
            remoteType: remoteType,
            experience: [minimumExperience, maximumExperience],
            salary: [minimumSalary, maximumSalary],
            totalExperience: totalExperience,
            applyType: applyType,
        };
        try {
            if (!editJobId) {
                const createdJob = await createJob(jobData);
                console.log('Job Created:', createdJob);
                onClose(); // Close modal after creating job
                alert('Job Created:')
                window.location.reload()
            } else {
                const updatedJob = await updateJob(editJobId.id, jobData)
                console.log('Job updated: ', updatedJob);
                alert('Job updated:')
                onClose()
                window.location.reload()

            }
        } catch (error) {
            console.error('Error updating/creating job:', error);
        }

    }


    // Update Job Data;

    useEffect(() => {
        if (editJobId) {
            setJobTitle(editJobId.title);
            setCompanyName(editJobId.companyName);
            setIndustry(editJobId.industry);
            setLocation(editJobId.location);
            setRemoteType(editJobId.remoteType);
            setMinimumExperience(editJobId.experience[0]);
            setMaximumExperience(editJobId.experience[1]);
            setTotalExperience(editJobId.totalExperience);
            setMinimumSalary(editJobId.salary[0]);
            setMaximumSalary(editJobId.salary[1]);
            setApplyType(editJobId.applyType)

        }
    }, [editJobId]);

    
    // it's a headless error (FocusTrap) that'sWhy I add this
    let refDiv = useRef(null)

    return (
        <>
            {isOpen && (
                <div>

                    {/* Step 1 popup */}
                    <div>
                        <Transition appear show={currentStep === 1} as={Fragment}>
                            <Dialog as="div" className="relative z-10" onClose={closeModal} initialFocus={refDiv}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel
                                                className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                                                style={{ width: '600px' }}
                                            >
                                                <Dialog.Title
                                                    as="h3"
                                                    className=" flex justify-between text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    <h1>Create Job</h1>
                                                    <p> Step 1</p>
                                                </Dialog.Title>

                                                <div ref={refDiv}></div>

                                                <div className="mt-6">
                                                    <p className="mb-2">Job Title<span className='text-red-500'>*</span></p>
                                                    <input
                                                        value={jobTitle}
                                                        type="text"
                                                        placeholder='ex. UI/UX Designer'
                                                        className="border p-2 rounded-md outline-none w-full"
                                                        onChange={handleJobTitleChange}


                                                    />
                                                    {jobTitleError && <p className="text-red-500">Job Title {jobTitleError}</p>}

                                                </div>
                                                <div className="mt-4">
                                                    <p className="mb-2">Company Name<span className='text-red-500'>*</span></p>
                                                    <input
                                                        value={companyName}
                                                        type="text"
                                                        placeholder='ex. Google'
                                                        className="border p-2 rounded-md outline-none w-full"
                                                        onChange={handleCompanyNameChange}
                                                    />
                                                    {companyNameError && <p className="text-red-500">Company Name {companyNameError}</p>}
                                                </div>

                                                <div className="mt-4">
                                                    <p className="mb-2">Industry<span className='text-red-500'>*</span></p>
                                                    <input
                                                        value={industry}
                                                        type="text"
                                                        placeholder='ex. Information Technology'
                                                        className="border p-2 rounded-md outline-none w-full"
                                                        onChange={handleIndustryChange}
                                                    />
                                                    {industryError && <p className="text-red-500">Industry {industryError}</p>}
                                                </div>
                                                <div className='flex gap-5'>
                                                    <div className="mt-4">
                                                        <p className="mb-2">Location</p>
                                                        <input
                                                            value={location}
                                                            type="text"
                                                            placeholder='ex. Chennai'
                                                            className="border p-2 rounded-md outline-none w-full"
                                                            onChange={handleLocationChange}
                                                        />
                                                    </div>

                                                    <div className="mt-4">
                                                        <p className="mb-2">Remote Type</p>
                                                        <input
                                                            value={remoteType}
                                                            type="text"
                                                            placeholder='ex. In-office'
                                                            className="border p-2 rounded-md outline-none w-full"
                                                            onChange={handleRemoteTypeChange}
                                                        />
                                                    </div>
                                                </div>


                                                <div className=" flex justify-end">
                                                    <button
                                                        style={{ backgroundColor: '#1597E4' }}
                                                        type="button"
                                                        className="mt-10 inline-flex justify-center rounded-md px-4 py-2 text-white"
                                                        onClick={handleNextButtonClick}
                                                    // onClick={() => openModal(2)}
                                                    >
                                                        Next
                                                    </button>
                                                </div>

                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>


                    {/* Step 2 popup */}
                    <div>
                        <Transition appear show={currentStep === 2} as={Fragment}>
                            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-black/25" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-y-auto">
                                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0 scale-95"
                                            enterTo="opacity-100 scale-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100 scale-100"
                                            leaveTo="opacity-0 scale-95"
                                        >
                                            <Dialog.Panel
                                                className="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                                                style={{ width: '600px' }}
                                            >
                                                <Dialog.Title
                                                    as="h3"
                                                    className=" flex justify-between text-lg font-medium leading-6 text-gray-900"
                                                >
                                                    <h1>Create Job</h1>
                                                    <p> Step 2</p>
                                                </Dialog.Title>


                                                <div className='mt-4'>
                                                    <p className="mb-2">Expirence</p>
                                                    <div className='flex gap-5 justify-between'>
                                                        <input
                                                            value={minimumExperience}
                                                            type="number"
                                                            placeholder='Minimum'
                                                            className="border p-2 rounded-md outline-none w-full"
                                                            onChange={(e) => handleExperienceChange(e, 'minimum')}

                                                        />
                                                        <input
                                                            value={maximumExperience}
                                                            type="number"
                                                            placeholder='Maximum'
                                                            className="border p-2 rounded-md outline-none w-full"
                                                            onChange={(e) => handleExperienceChange(e, 'maximum')}

                                                        />
                                                    </div>
                                                </div>
                                                <div className='mt-4'>
                                                    <p className="mb-2">Salary</p>
                                                    <div className='flex gap-5 justify-between'>
                                                        <input
                                                            value={minimumSalary}
                                                            onChange={(e) => handleSalaryChange(e, 'minimum')}
                                                            type="number"
                                                            placeholder='Minimum'
                                                            className="border p-2 rounded-md outline-none w-full"
                                                        />
                                                        <input
                                                            value={maximumSalary}
                                                            onChange={(e) => handleSalaryChange(e, 'maximum')}
                                                            type="number"
                                                            placeholder='Maximum'
                                                            className="border p-2 rounded-md outline-none w-full"
                                                        />
                                                    </div>
                                                </div>

                                                <div className='mt-4'>
                                                    <p className="mb-2">Total Expirence</p>
                                                    <div className=''>
                                                        <input
                                                            value={totalExperience}
                                                            type="text"
                                                            placeholder='ex. 100'
                                                            className="border p-2 rounded-md outline-none w-full"
                                                            onChange={handleTotalExperienceChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='mt-4'>
                                                    <p className="mb-2">Apply type</p>
                                                    <div className='flex gap-5'>
                                                        <label htmlFor="quick-apply" className='flex gap-2'>
                                                            <input
                                                                type="radio"
                                                                id="quick-apply"
                                                                name="applyOption"
                                                                value="Quick Apply"
                                                                checked={applyType === 'Quick Apply'}
                                                                onChange={(e) => setApplyType(e.target.value)}
                                                            />
                                                            Quick Apply
                                                        </label>
                                                        <label htmlFor="external-apply" className='flex gap-2'>
                                                            <input
                                                                type="radio"
                                                                id="external-apply"
                                                                name="applyOption"
                                                                value="External Apply"
                                                                checked={applyType === 'External Apply'}
                                                                onChange={(e) => setApplyType(e.target.value)}
                                                            />
                                                            External Apply
                                                        </label>
                                                    </div>
                                                </div>


                                                <div className=" flex justify-end">
                                                    <button
                                                        onClick={handelSaveData}
                                                        style={{ backgroundColor: '#1597E4' }}
                                                        type="button"
                                                        className="mt-16 inline-flex justify-center rounded-md px-4 py-2 text-white"
                                                    >
                                                        Save
                                                    </button>

                                                </div>

                                            </Dialog.Panel>
                                        </Transition.Child>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>

                </div>
            )}
        </>
    )


}

export default ModelBox;