import React from 'react'
import PillBtn from './PillBtn'
import { useState } from 'react'

export default function Settings({localData,setLocalData}) {
    const [categories, setCategories] = useState(() => {
        const data = JSON.parse(localStorage.getItem("data"))
        return data.settings.categories
    })
    function toggleCategory(category) {
        console.log(1);
        const updatedCategories = {
            ...categories,
            [category]: !categories[category]
        }
        setCategories(updatedCategories)
        const data = JSON.parse(localStorage.getItem("data"))

        data.settings.categories = updatedCategories

        localStorage.setItem("data", JSON.stringify(data))
        console.log(JSON.parse(localStorage.getItem("data")).settings.categories);
        setLocalData(JSON.parse(localStorage.getItem("data")))
    }
    const toggleDarkMode = () => {
        setLocalData(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                darkMode: !prev.settings.darkMode
            }
        }));
        console.log(localData);
        
    };
    
    return (
        <>
        <ul className='settings_list'>
            {Object.entries(categories).map(([category,enabled]) =>(
                <li key={category} className='settings_item'>
                    <p>{category}</p>
                    <PillBtn checked={enabled} click={() => toggleCategory(category)}/>
                </li>
            )
            
            )}
        </ul>
        <button className={"theme_btn"} onClick={toggleDarkMode}>{localData.settings.darkMode && "switch to light mode" || "switch to dark mode"}</button>
        </>
    )
}
