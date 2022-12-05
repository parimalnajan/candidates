import { getAllByRole } from '@testing-library/react';
import React, { useContext, useEffect } from 'react'
import { candidateContext } from '.';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { getCandidateById } from '../../utils';

const CandidateDetails = () => {
    const selectedId= useParams();
    const navigate = useNavigate()
    const [currentCandidate,setCurrentCandidate]=useState({})
    // const {allCandidates } = useContext(candidateContext);
    //  setCurrentCandidate(allCandidates?.find((x)=>x.id===selectedId.id)) 

    useEffect( () => {

        (async () => {
            const resData = await getCandidateById(selectedId.id)
            setCurrentCandidate(resData)
          })();
    
      }, [selectedId.id])


    const {
        gender,address,phone,email,name,
        education,
        experience,
        hobbies,
        skills,
        profile_picture
    } = currentCandidate
    
    
  return (
    <section className="flex flex-col rounded-md ">

      <div className='w-full bg-gray-100 mb-2 p-4'>
        <div className="text-left gap-2">
      <button className=' px-4 py-1 rounded-md bg-blue-400' onClick={()=>{navigate(`/candidate/${selectedId.id}/edit`)}}>Edit</button>
      <div className='text-left '>ID: {selectedId.id}</div>
            <div><img className='w-32 h-32 rounded-full  mx-auto border border-gray-700' src={profile_picture}></img></div>
            <div className='text-2xl text-gray-600 font-bold'>{name}</div>
            <div>{phone}</div>
            <div>{email}</div>
            <div>{address}</div>
            <div>{gender}</div>
        </div>

            <h2 className='text-left text-2xl text-gray-800 font-medium mt-8 mb-4 '>Education</h2>
        <div className="flex flex-row gap-20 ">
            {
                education?.map((item)=>{
                    return(
                        <div className='flex flex-col text-left'>
                            <div className='text-gray-700 font-medium'>{item.institute}</div>
                            <div  className='text-xs font-semibold text-gray-400'>Passed {item.pass_out_year}</div>
                            <div className='text-sm font-semibold text-gray-700'>Degree: {item.degree} 
                            <span className='ml-4'>Percentage: {item.percentage}</span>
                            </div>
                        </div>
                    )
                })
            }
              </div>
            <h2 className='text-left text-2xl text-gray-800 font-medium mt-12 mb-4'>Experience</h2>
        <div className="flex flex-row gap-10 ">

            {
                experience?.map((item)=>{
                    return(
                        <div className='text-left'>
                          <div><span className='font-semibold text-gray-600' > {item.role}</span>  <div className='text-gray-700 font-bold'> {item.company}</div></div>                      
                          <span className='text-xs font-bold text-gray-400'>{item.duration_from}</span>
                            <span className='text-xs font-bold text-gray-400'> {item.duration_to}</span>
                            <div>Project: {item.project}</div>
                            <div>Team of {item.team_size}</div>
                        </div>
                    )
                })
            }
              </div>

            <h2 className='text-left text-2xl text-gray-800 font-medium mt-12 mb-4'>Hobbies</h2>
            <div className="flex  flex-row ">
            {
                hobbies?.map((hobby=>{
                    return(
                        <div className="text-sm font-semibold text-gray-600 justify-evenly w-max bg-purple-400 rounded-md p-2 mx-2 border-0">
                            {hobby}
                        </div>
                    )
                }))
            }
            </div>
            <h2 className='text-left text-2xl text-gray--800 font-medium mt-12 mb-4'>Skills</h2>
            <div className="flex  flex-row ">
            {
                skills?.map((skill=>{
                    return(
                        <div className="text-sm font-semibold text-gray-600 justify-evenly w-max bg-purple-400 rounded-md p-2 mx-2 border-0">
                            {skill.name} ({skill.experience}) 
                        </div>
                    )
                }))
            }
            </div>
    </div>
    </section>
  );
}




export default CandidateDetails