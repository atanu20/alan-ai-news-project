// Use this sample to create your own voice commands
intent('hello world', p => {
    p.play('(hello|hi there)');
});


// const API_KEY = '7bdfb1b10aca41c6becea47611b7c35a';
const API_KEY='0f60eb16cef54a3ab6c8ece26721a4cb';
let savedArticles = [];

// News by Source
intent(`Give me the news from $(source * .*)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
//      const val=p.source.value.split(" ").length;
    
   
            if(p.source.value) {
                    NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`
                  }
            
        let sour=p.source.value;
    
            
            
     
   
    
    api.request(NEWS_API_URL, (error, response, body) => {
        const { articles } = JSON.parse(body);
        const res= articles.length;
        
        if(!res) {
            p.play('Sorry, please try searching for news from a different source');
          
        }
        else{
            
        
        
        savedArticles = articles;
        
        p.play({ command: 'newNews', articles,sour });
        p.play(`Here are the (latest|recent) ${p.source.value}.`);
             p.play("Would you like me to read the headlines?");
        p.then(confirm);
  }
//       
//         savedArticles = articles;
//         
//         p.play({ command: 'newNews', articles,sour });
//         p.play(`Here are the (latest|recent) ${p.source.value}.`);
        
        

    });
})

// News by Terms
intent(`what about $(term * .*)`,(p)=>{
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
     if(p.term.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`
    }
     let sour=p.term.value;
    api.request( NEWS_API_URL,(error,response,body)=>{
        const { articles } = JSON.parse(body);
        const res= articles.length;
        
        if(!res) {
            p.play('Sorry, please try searching for something else');
          
        }
        else{         
                
        savedArticles = articles;
        
        p.play({ command: 'newNews', articles,sour });
        p.play(`Here are the (latest|recent) articles on ${p.term.value}.`);
             p.play("Would you like me to read the headlines?");
        p.then(confirm);
       }
        
    });
    

})


// News by Categories
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, (p) => {
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=in`;
    
    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`
    }
    let sour=p.C.value;
    
    api.request( NEWS_API_URL,(error,response,body)=>{
        const { articles } = JSON.parse(body);
        const res= articles.length;
        
        if(!res) {
            p.play('Sorry, please try searching for news from a different category');
          
        }
        else{  
            
        savedArticles = articles;
        
        p.play({ command: 'newNews', articles ,sour});
        
        if(p.C.value) {
            p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);        
        } else {
            p.play(`Here are the (latest|recent) news`);   
        }
        
       
              p.play("Would you like me to read the headlines?");
        p.then(confirm);
        }
        
      
    
    
       
    });
});


const confirm=context(()=>{
    intent('yes', async (p)=>{
        for(let i=0;i<savedArticles.length;i++)
            {
                p.play({command:'highlight',article: savedArticles[i]});
                p.play(`${savedArticles[i].title}`);
            }
    })
     intent('no',(p)=>{
        p.play("Ok,Thank You")
    })
    
   
})

intent('open (the|) (article|) (number|) $(number* (.*))', (p) => {
    if(p.number.value) {
        p.play({ command:'open',  articles: savedArticles,number: p.number.value})
    }
})

intent('(go|) back', (p) => {
    p.play('Sure, going back');
    p.play({ command: 'newNews', articles: []})
})