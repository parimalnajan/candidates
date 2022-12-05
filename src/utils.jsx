export  const getCandidateById=async (id)=>{
    const url=`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`
    // Awaiting for fetch response
    const response = await fetch(url);
 
    // Awaiting for response.json()
    const resData = await response.json();
      return resData
}

export const createNewCandidate = async (data) => {
    const url='https://60d5a2c2943aa60017768b01.mockapi.io/candidate'
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
    return resData
}

export const updateCandidateDetails = async (id,data)=>{
    const url=`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`
 
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  // Awaiting response.json()
  const resData = await response.json();

  // Returning result data
  return resData
  //---------can only send changed data to replace

}