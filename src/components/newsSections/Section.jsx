import React, { useState } from 'react'
import { MdArrowForwardIos } from "react-icons/md";
import Article from './article';
import "./style.css"
export default function Section({section,catagory}) {
  const [opened, setOpened] = useState(true)
  function handleClick(){
    setOpened(!opened)

  }
  return (
    <section>
        <div className='section__title_wrapper'>
          <h2>{section.section}</h2>
        <MdArrowForwardIos onClick={handleClick} className={`"section_arrow ${opened ? "fold_out":"fold_in"}`}/>
        </div>
        <ul className={`section_list ${opened ? "article_open":"article_closed"}`}>
            {section.results.map((result,index)=>(
              <Article 
              opened={opened}
              key={index}
              data={result}
              />
            ))}
        </ul>
        
    </section>
  )
}
