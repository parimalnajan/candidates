import React from 'react'

const CandidateDetails = () => {

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
      const doo =async () =>{
       const url='https://60d5a2c2943aa60017768b01.mockapi.io/candidate'
         // Awaiting for fetch response
         const response = await fetch(url);
      
         // Awaiting for response.json()
         const resData = await response.json();
    
         // Returning result data
         console.log(resData) ;
      }
      
      const post =async () =>{
       const url='https://60d5a2c2943aa60017768b01.mockapi.io/candidate'
     
               // Awaiting for fetch response and 
            // defining method, headers and body  
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                  'Content-type': 'application/json'
              },
              body: JSON.stringify(data)
          });
    
          // Awaiting response.json()
          const resData = await response.json();
    
          // Returning result data
          console.log(resData) 
    
      }
    
      const put =async () =>{
       const url='https://60d5a2c2943aa60017768b01.mockapi.io/candidate/185'
     
               // Awaiting for fetch response and 
            // defining method, headers and body  
            const response = await fetch(url, {
              method: 'PUT',
              headers: {
                  'Content-type': 'application/json'
              },
              body: JSON.stringify(dataNew)
          });
    
          // Awaiting response.json()
          const resData = await response.json();
    
          // Returning result data
          console.log(resData) 
    
          //---------can only send changed data to replace
    
      }
  return (
    <div className='flex flex-col'>----CandidateDetails----
             <button onClick={doo}>do do do</button>
     <button onClick={post}>postit</button>
     <button onClick={put}>PUT</button>
    </div>
  )
}

export default CandidateDetails