import { useCallback, useEffect, useState } from "react"
import apis from "../../api/apis";


const useFetch = (url) =>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

   const fetchData = useCallback(async() =>{
       try {
        setLoading(true)
         const response = await apis.get(url);
         setData(response.data)
       } catch (error) {
        console.error(error);
        setError(error)
       }finally{
        setLoading(false)
       }
   },[url])

   useEffect(() =>{
    fetchData()
   },[fetchData]);

   return {data,error,loading, refetch:fetchData}

}

export default useFetch;