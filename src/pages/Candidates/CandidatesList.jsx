import React, { useContext } from 'react'
import { candidateContext } from '.';
import { useNavigate} from "react-router-dom";


const CandidatesList = ({names}) => {
    const navigate= useNavigate()
    const handleClick = (id) =>{

        navigate(`/candidate/${id}`);
    }
  return (
    <section className='flex flex-col mr-4 border-r border-gray-200 text-left'>
      <button className='text-left px-4 py-1 rounded-md bg-blue-400 w-fit mt-4 ml-4'  onClick={()=>{navigate(`/candidate/new`)}}>ADD +</button>

        <ol className="list-none ">
        {
            names.map((name)=>{
                return<>
                    <li className='p-3 pl-6 border-t hover:bg-violet-500 ' 
                    onClick={()=>handleClick(name.id)}
                    key={name.id}>{name.name}</li>
                </>
            })
        }
        </ol>
    </section>
  )
}

export default CandidatesList