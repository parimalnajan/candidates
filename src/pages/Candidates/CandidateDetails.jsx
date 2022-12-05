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
    
    console.log(skills)
    
    const data= {
        "profile_picture": "testing-naruto",
        "name": "naruto uzumaki",
        "address": "lif",
        "phone": "9879879870",
        "email": "test.naruto@nonstopio.com",
        "gender": "male",
        "hobbies": [
        "Reading",
        "Music"
        ],
        "education": [
        {
        "institute": "ABC School",
        "degree": "10th",
        "percentage": 99,
        "pass_out_year": 2010
        },
        {
        "institute": "ABC School",
        "degree": "10th",
        "percentage": 99,
        "pass_out_year": 2010
        }
        ],
        "skills": [
        {
        
        "name": "Java",
        "experience": 4
        },
        {
        "name": "Java",
        "experience": 4
        },
        {
        "name": "Java",
        "experience": 4
        }
        ],
        "experience": [
        {
        "company": "ABC PVT LTD",
        "project": "Some prohect",
        "role": "SSE",
        "team_size": 4,
        "duration_from": "Jan 2021",
        "duration_to": "Nov 2021"
        },
        {
        "company": "ABC PVT LTD",
        "project": "Some prohect",
        "role": "SSE",
        "team_size": 4,
        "duration_from": "Jan 2021",
        "duration_to": "Nov 2021"
        },
        {
        "company": "ABC PVT LTD",
        "project": "Some prohect",
        "role": "SSE",
        "team_size": 4,
        "duration_from": "Jan 2021",
        "duration_to": "Nov 2021"
        }
        ],
        "id": "1"
        }
    
        const dataNew = {
          "profile_picture": "testing-sasuke",
          "name": "sasuke uchiha",
          "address": "not lif",
          "phone": "9879879870",
          "email": "test.naruto@nonstopio.com",
          "gender": "male",
          "hobbies": [
          "Reading",
          "Music"
          ],
          "education": [
          {
          "institute": "ABC School",
          "degree": "10th",
          "percentage": 99,
          "pass_out_year": 2010
          },
          {
          "institute": "ABC School",
          "degree": "10th",
          "percentage": 99,
          "pass_out_year": 2010
          }
          ],
          "skills": [
          {
          
          "name": "Java",
          "experience": 4
          },
          {
          "name": "Java",
          "experience": 4
          },
          {
          "name": "Java",
          "experience": 4
          }
          ],
          "experience": [
          {
          "company": "ABC PVT LTD",
          "project": "Some prohect",
          "role": "SSE",
          "team_size": 4,
          "duration_from": "Jan 2021",
          "duration_to": "Nov 2021"
          },
          {
          "company": "ABC PVT LTD",
          "project": "Some prohect",
          "role": "SSE",
          "team_size": 4,
          "duration_from": "Jan 2021",
          "duration_to": "Nov 2021"
          },
          {
          "company": "ABC PVT LTD",
          "project": "Some prohect",
          "role": "SSE",
          "team_size": 4,
          "duration_from": "Jan 2021",
          "duration_to": "Nov 2021"
          }
          ],
          "id": "1"
          }
      
    


  return (
    <section className="flex flex-col rounded-md w-1/2">
      ----CandidateDetails---- s 
      <button onClick={()=>{navigate(`/candidate/${selectedId.id}/edit`)}}>Edit</button>
      <button onClick={()=>{navigate(`/candidate/new`)}}>ADD</button>

      <div>{selectedId.id}</div>
      <div className='w-full bg-gray-100 mb-2 p-4'>
            <div><img className='w-32 h-32 rounded-full m-8 mx-auto' src={profile_picture}></img></div>
        <div className="text-left gap-2">
            <div className='text-2xl text-gray-600 font-bold  mt-4'>{name}</div>
            <div>{phone}</div>
            <div>{email}</div>
            <div>{address}</div>
            <div>{gender}</div>
        </div>

            <h2 className='text-left text-xl text-gray-500 font-medium mt-4 mb-2'>Education</h2>
        <div className="flex flex-row gap-10 ">
            {
                education?.map((item)=>{
                    return(
                        <div className='flex flex-col text-left'>
                            <div className='text-gray-800 font-medium'>{item.institute}</div>
                            <div className='text-sm font-normal'>Degree: {item.degree} 
                            <span className='ml-4'>Percentage: {item.percentage}</span>
                            </div>
                            <div  className='text-xs font-bold text-gray-400'>Passed in year {item.pass_out_year}</div>
                        </div>
                    )
                })
            }
              </div>
            <h2 className='text-left text-xl text-gray-600 font-medium mt-4'>Experience</h2>
        <div className="flex flex-row gap-10 ">

            {
                experience?.map((item)=>{
                    return(
                        <div className='text-left'>
                            
                            <span className='text-xs font-bold text-gray-400'>{item.duration_from}</span>
                            <span className='text-xs font-bold text-gray-400'> {item.duration_to}</span>
                          <div><span className='text-sm font-semibold'> {item.role}</span> at <div className='text-gray-800 font-medium'> {item.company}</div></div>                      
                         
                            <div>Project: {item.project}</div>
                            <div>With a team of {item.team_size}</div>
                        </div>
                    )
                })
            }
              </div>

            <h2 className='text-left text-xl text-gray-600 font-medium mt-4'>Hobbies</h2>
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
            <h2 className='text-left text-xl text-gray-600 font-medium mt-4'>Skills</h2>
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