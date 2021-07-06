import React,{ useState, useEffect, createRef } from 'react'
// import { NavLink } from 'react-router-dom'


const CardData = ({image,author,date,url,title,index,activeArt}) => {
    if(image==="null")
    {
        image ="https://s.france24.com/media/display/d1676b6c-0770-11e9-8595-005056a964fe/w:1400/p:16x9/news_1920x1080.webp"
    }

    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);
  
    useEffect(() => {
      window.scroll(0, 0);
  
      setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()));
    }, []);
  
    useEffect(() => {
      if (index === activeArt && elRefs[activeArt]) {
        scrollToRef(elRefs[activeArt]);
      }
    }, [index, activeArt, elRefs]);

    return (
        <>
             <div ref={elRefs[index]} className="col-lg-3 col-md-6 col-12 mb-3 cardd">
                <a href={url} target="_blank">
                <div className="card" >
                     <img src={image || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png'} alt="bb" className="imgg" />
                     
                     <div className="p-3 crd-box">
                         <p>{author}</p>
                         <p>{(new Date(date).toDateString())}</p>
                     </div>
                     <div className="p-2">
                     <h5>{title}</h5>                  
                    
                     </div>
                     {
                         activeArt==index ? (
                             <>
                             <div className="text-right p-2 indbox">
                                <h4>{index+1}</h4>
                            </div>

                             </>
                         ) : (
                             <>
                             <div className="text-right p-2 indboox">
                         <h4>{index+1}</h4>
                     </div>

                             </>
                         )
                     }
                     

                     
                 </div>
                </a>
             </div>
             
            
        </>
    )
}

export default CardData;
