import React, { useEffect, useState,useMemo } from 'react'
import Section from './Section'

export default function NewsSections({localData}) {
    const apiKey = "J4v9GvGrufWRuFott0j9sm1YQIMHu07Gj8vM0zHPELzFnfwp"
     
    const [data, setData] = useState(null)
    const [error,setError] = useState(null)
    const urls = useMemo(() => {
        if (!localData?.settings?.categories) return [];

        return Object.entries(localData.settings.categories)
            .filter(([category, enabled]) => enabled)
            .map(([category]) =>
                `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=${apiKey}`
            );
    }, [localData]);
    
    useEffect(() => {
        if (navigator.onLine){const fetchAll = async () => {
            try {
                const results = await Promise.all(
                    urls.map(url =>
                        fetch(url)
                            .then(res=>{
                                if (!res.ok) throw new Error(res.status);
                                return res.json()
                            })
                    )
                )
                setData(results)
                console.log(results);
                
            } catch(error){
                if (error instanceof TypeError){
                    setError("no connection")
                }else{
                setError(error.message)}
            }
        }
        fetchAll()}
    },[urls])
    useEffect(()=>{
        console.log(error);
    },[error])
    
    
    if(error) return <p>error</p>
    if(!data) return <p>loading</p>
    if(data){
        console.log(...data);
        
    }


    return (
        <div>
            {data.map((section, index) => (
                <Section
                    key={index}
                    section={section}
                />
            ))}
        </div>
    )
}
