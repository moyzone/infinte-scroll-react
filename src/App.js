import { useState,useEffect, useRef } from 'react';
import './App.css';
import NewsBox from './components/NewsBox';

function App() {

  const [feedData,setFeedData]=useState([]);
  const updateFeed=useRef(false);
  const [page,setPage]=useState(1);

  useEffect(() => {
    const url = `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`;

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json.nodes);
            setFeedData(json.nodes);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
  },[]);


  useEffect(() => {
    if(!updateFeed.current || page>3) return;
    const url = `https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`;

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json.nodes);
            setFeedData(prev=>[...prev,...json.nodes]);
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
  },[page,updateFeed]);

  useEffect(()=>{
    window.addEventListener('scroll',handleScroll);

    return ()=>window.removeEventListener("scroll",handleScroll);
  },[])

  const handleScroll=()=>{
    // console.log("Sourav Height:"+document.documentElement.scrollHeight)
    // console.log("Sourav Top:"+document.documentElement.scrollTop)
    // console.log("Inner height"+window.innerHeight)

    if(window.innerHeight+document.documentElement.scrollTop +1 >= document.documentElement.scrollHeight && page<4){
      
      console.log("reached "+page)
      setPage(prev=>prev+1);
      updateFeed.current=true;
      
    } 

  }
  return (
    <div className="App">
      <h1>NEWS FEED </h1>
        {
          feedData.map((item, index) => (
            <NewsBox newsItem={item}/>
          ))
        }
    </div>
  );
}

export default App;
