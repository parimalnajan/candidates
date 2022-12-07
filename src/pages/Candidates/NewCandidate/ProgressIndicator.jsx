import React, { useContext } from 'react'
import { StepContext } from '.'


const ProgressCircle = ({ currentStep, iterator ,lastStep,textToDisplay }) => {
  return (
    <div className="flex flex-row items-center text-gray-500 ">
      <div className={`${iterator<=currentStep?"bg-brand text-gray-700 ":""} border-gray-200 border-2 rounded-full p-2 flex flex-row items-center justify-center`}>
        <div className="text-xs font-semibold">{textToDisplay}</div>
      </div>

    <div> 
        <div style={{ height: "1.5px" }} className={`bg-gray-200 ${iterator==lastStep?"w-0":"w-16"}`}></div> 
        <div
          style={{ height: "1.5px", bottom: "0.9px" }}  // "track" and "thumb"
          className={`bg-brand relative left-0     
          ${iterator==lastStep?"w-0":iterator < currentStep ? "w-16":iterator==currentStep?"w-8" :iterator>currentStep?"w-0":""}`}   // thumb render as empty/half/full as per state
        ></div>
      </div>
    </div>
  );
};

 const ProgressIndicator = () => {
  const {steps,currentStep} = useContext(StepContext)
  const stepNumbers = steps.map((x)=>x.id)   // convert ["skills","edu",...]  => [1,2,...]
  console.log(steps,currentStep)
  return (
    <div className="text-center mb-4 flex">     
      {steps?.map((iterator) => (
          <ProgressCircle
            currentStep={currentStep}
            iterator={iterator.id}
            textToDisplay={iterator.name}
            lastStep={steps.length}
          />
        ))}
      </div>

  )
}


export default ProgressIndicator