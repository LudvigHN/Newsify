import{ useState,useEffect,useRef } from 'react'
import "./style.css"
export default function Article({data,opened}) {
    const [swiped,setSwiped] = useState(null)
    const [startX, setStartX] = useState(0)
    const [endX, setEndX] = useState(0)
    const swiperRef = useRef(null)

    function handleTouchStart(event) {
        const screenX = event.touches[0].screenX
        console.log(screenX);
        
        setStartX(screenX)

    }
    function handleTouchEnd(event) {
        const endXPos = event.changedTouches[0].screenX

        setEndX(event.changedTouches[0].screenX)
        console.log(endXPos);
        console.log("startX: " +startX, "endX: "+endXPos);
        
        if (swiped == null && startX > endXPos+30){
            console.log("swiped left");
            setSwiped("left")
        }
        if(swiped == "left" && startX < endXPos-30){
            setSwiped(null)
        }
        
    }
  return (
    <article className={`${swiped} article `} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}> 
    {data?.multimedia?.[2]?.url && (
    <img
        src={data.multimedia[2].url}
        alt=""
        className="article_image"
    />
)}
    <div className='article__text_wrapper'>
    <a href={data.url} className='article_link'>
    <h3 className='article_headline'>{data.title}</h3>
    </a>
    <p className='article_text'>{data.abstract}</p>
    </div>
    
    <button className={`save_btn ${swiped ? "btn_show":"btn_hidden"}`}>Save</button>
    </article>
    
  )
}
