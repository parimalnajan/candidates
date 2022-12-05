export  const getCandidateById=async (id)=>{
    const url=`https://60d5a2c2943aa60017768b01.mockapi.io/candidate/${id}`
    // Awaiting for fetch response
    const response = await fetch(url);
 
    // Awaiting for response.json()
    const resData = await response.json();
      return resData
}