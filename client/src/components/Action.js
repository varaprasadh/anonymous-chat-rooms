import React, { useRef } from 'react';
import "../styles/action.css";
import {useEffect} from 'react';
import Lottie from 'react-lottie';
import heartData from "./lottie_files/heart.json";
import likeData from "./lottie_files/like.json";
import dislikedata from "./lottie_files/dislike.json";
import stayhomedata from "./lottie_files/stay_home.json";



const LottieView =({width,height,message,hideMessage,lottieData,timeout=0,data,onDone})=>{

     const defaultOptions = {
         loop: true,
         autoplay: true,
         animationData: lottieData,
         rendererSettings: {
             preserveAspectRatio: 'xMidYMid slice'
         }
     };
     useEffect(()=>{
       let timeOut=setTimeout(()=>{
         try{
              onDone();
         }catch(err){
             //i dont care
         }
       }, timeout);
       return ()=>clearTimeout(timeOut);
     },[])

    return(
        
            <div className="lottie-wrapper">
                {!hideMessage && <div className="action-info">{message}</div>}
                <div className="lottie-view">
                   <Lottie 
                        options={defaultOptions}
                        height={width || 400}
                        width={height || 400}/>
                </div>
            </div>
    )
}

const getFromcomponentMap=(props)=>{
    console.log("check",props);
    const {isSelf,username}=props.data;
    switch(props.type){
        case 'LIKE':     return <LottieView message={`${isSelf?"you":username} given`}  timeout={1800} lottieData={likeData} {...props}/>;
        case 'DISLIKE':  return <LottieView message={`${isSelf?"you":username} given`}  timeout={1800} lottieData={dislikedata} {...props}/>;
        case 'HEART':    return <LottieView message={`${isSelf?"you":username} given`}  timeout={2500} lottieData={heartData} {...props}/>;
        case 'STAYHOME': return <LottieView message={`${isSelf?"you":username} saying`} timeout={4000} lottieData={stayhomedata} {...props}/>;
        default:         return <div></div>;
    }
}
function Action(props) {

    return (
      <div className="action-container lottie-container">
        {getFromcomponentMap(props)}
      </div>)
}

export default Action;
export {getFromcomponentMap}

