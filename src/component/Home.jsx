import React,{useState,useEffect}  from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import CardData from './CardData'
import wordsToNumbers from 'words-to-numbers';

const infoCards = [
    { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
    { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
    { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What about PlayStation 5' },
    { color: '#283593', title: 'News by Sources', info: 'Techcrunch, BBC News, Buzzfeed, ABC News...', text: 'Give me the news from BBC NEWS' },
  ];

  const alankey="your key"
const Home = () => {
    const [view, setView] = useState(false);
    const [data ,setData]=useState([]);
    const [value ,setValue]=useState("");
    const [activeArt, setActiveArt] = useState(-1)
    useEffect(() => {
        alanBtn({
            key:alankey,
            onCommand: ({command,articles,sour,number}) => {
                if (command === 'newNews') {
                  
                    // console.log(articles)
                    setData(articles)
                    if(articles.length)
                    {
                        setView(true)
                    }
                    else{
                        setView(false)
                    }
                   
                    setValue(sour)
                    setActiveArt(-1)
                 
                }
                else if(command==='highlight')
                {
                    setActiveArt((prev)=>prev+1)
                }
                else if(command==='open')
                {
                     console.log(number)
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber-1 ];

                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again...');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    } else {
                        alanBtn().playText('Please try that again...');
                    }
                }
              }
        })
        
    }, [])
    
   

    return (
        <>
            <div className="home">
                <div className="container-fluid">
                    <div className="text-center text">
                        <h1>Welcome to AI NEWS PLATFORM</h1>
                    </div>
                   
                    {
                        view ?(<>
                        <div className="goo">
                            <div className="text-center">For Going Back Say : "Go Back!" </div>
                        </div>

                        </>) : null
                    }
                    <br />
                    <div className="row">
                       <div className="col-10 mx-auto">

                    {
                        view ?(
                            <>
                            <div className="row">
                            {
                                data.map((val,ind)=>{
                                    return(
                                        <>
                                        <CardData
                                        image={val.urlToImage}
                                        author={value}
                                        date={val.publishedAt}
                                        url={val.url}
                                        title={val.title}
                                        key={ind}
                                        index={ind}
                                        activeArt={activeArt}


                                        />

                                        </>
                                    )
                                })
                            }

                            </div>
                           



                            </>
                        ):(
                            <>
                             
                       <div className="row">
                        
                        {
                            infoCards.map((val,ind)=>{
                                return(
                                    <>
                                    <div className="col-lg-3 col-md-6 col-12 mb-3">
                                    <div className="card p-3" style={{backgroundColor:val.color}}>
                                        <h3 className="text-center text-white pt-3">{val.title}</h3>
                                        <div className="pt-5">
                                            <h5 className="text-white pt-3">{
                                                val.info ?
                                                (
                                                    <>
                                                    {val.title.split(" ")[2]}: <br />
                                                    {val.info}

                                                    </>
                                                ):null
                                            }</h5>
                                        </div>
                                        <div className="bot">
                                            <h4 className="text-white">  Try to Saying: </h4>
                                           
                                           <h5 className="text-white">

                                                "{
                                                val.text
                                            }"</h5>
                                        </div>
                                        
                                    </div>
                                </div>

                                    </>
                                )
                            })
                        }
                        
                    </div>
                      



                            </>
                        )
                    }
                 
                 </div>
                   </div>
                </div>

               

            </div>
            <br /><br /><br />
            
        </>
    )
}

export default Home
