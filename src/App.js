import React, {useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';
import wordsToNumbers from 'words-to-numbers';
const alanKey = '245b0a054b0f708968e3a2abd3f3f0742e956eca572e1d8b807a3e2338fdd0dc/stage';
//7dc27106a735b0e368e3a2abd3f3f0742e956eca572e1d8b807a3e2338fdd0dc/stage
const App=()=>{
  const [newsArcticles, setNewsArticles]= useState([]);
  const [activeArticle, setActiveArticle]= useState(-1);
  const classes=useStyles();
  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({command, articles, number}) => {
        if(command === 'newHeadlines'){
          setNewsArticles(articles);
          setActiveArticle(-1);
        }
        else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle+1);
        }
        else if(command === 'open'){
          const parsedNumber = number.length >2 ? wordsToNumbers(number,{fuzzy:true}):number;
          //console.log(parsedNumber);
          const article = articles[parsedNumber-1];
          if(parsedNumber>articles.length){
            alanBtn().playText('Please try that again.')
          }
          else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          }

        }
      }
    })
  }, [])
  return(
    <div>
      <div className={classes.logoContainer}>
        <img src="https://i.ibb.co/N6NYtQ8/efa6d3b7c6b54cf1ab2f060fc3e09b98.png" className={classes.alanLogo} alt="logo"/>
      </div>
      <NewsCards articles={newsArcticles} activeArticle={activeArticle}/>
    </div>
  );
}

export default App;
