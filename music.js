const playlists= document.getElementsByClassName("playlists-container")[0];
const currentAndTotalTimeTag=document.getElementsByClassName("currentAndTotalTime")[0];
const audioTag=document.getElementsByClassName("audioTag")[0];
const currentProgressTag= document.getElementById("currentProgress");
const previousBtn=document.getElementsByClassName("previousBtn")[0];
const playBtn=document.getElementsByClassName("playBtn")[0];
const pauseBtn=document.getElementsByClassName("pauseBtn")[0];
const nextBtn=document.getElementsByClassName("nextBtn")[0];
const tracks =[
    {trackId:"./music/Nobody's Home.mp3",title:"Nobody's Home- Avril Lavigne"},
    {trackId:"./music/In_The_End_-_Lyrics.mp3", title:"In the end"},
    {trackId:"./music/Fan thar nan taw.mp3", title:"Fan thar nan taw"},
    {trackId:"./music/La yate.mp3", title:"La yate"},
    {trackId:"./music/Alone.mp3", title:"Alone"},
    {trackId:"./music/Nay chin tar min a nar.mp3", title:"Nay chin tar min a nar"}
];
let duration=0;
let durationText= "00:00"
audioTag.addEventListener("loadeddata", ()=>{
    duration=Math.floor(audioTag.duration);
    durationText= minTextAndSecText(duration);
})
audioTag.addEventListener("ended",()=>{
    currentTrackIndex+=1;
    if(currentTrackIndex>tracks.length-1){
        currentTrackIndex=0;
    }
        playSong()
    
})
audioTag.addEventListener("timeupdate", ()=>{
    const currentTime= Math.floor(audioTag.currentTime);
    const currentTimeText=minTextAndSecText(currentTime);
    const currentAndDuration = currentTimeText+ " / "+durationText;
    currentAndTotalTimeTag.textContent=currentAndDuration;
    updateCurrentProgress(currentTime);
})
const updateCurrentProgress=(currentTime)=>{
    const currentProgresswidth=(500/duration)*currentTime;
    currentProgressTag.style.width=currentProgresswidth.toString()+"px";
}
const minTextAndSecText=(totalSecond) => {
    const  min=Math.floor(totalSecond/60);
    const sec=totalSecond%60;

    const minText= min<10? "0"+ min.toString() : min;
    const secText= sec<10? "0"+ sec.toString() : sec;
   return minText+":"+secText;
}
let currentTrackIndex=0;
let isPlaying=false;
for(let i=0; i<tracks.length; i++){
    const trackTag= document.createElement("div");
    trackTag.addEventListener("click", ()=>{
        currentTrackIndex=i;
        playSong();
    })
    trackTag.classList.add("trackItem");
    const title= (i+ 1).toString()+ ". "+tracks[i].title;
    trackTag.textContent= title;
    playlists.append(trackTag)
}
playBtn.addEventListener("click", ()=>{
    isPlaying=true;
    const currentTime=Math.floor(audioTag.currentTime);
    if(currentTime===0){
        playSong();
    }else{
        audioTag.play();
        playAndPauseTag();
    }
})
pauseBtn.addEventListener("click", ()=>{
    isPlaying=false;
    audioTag.pause();
    playAndPauseTag();
})
previousBtn.addEventListener("click", () => {
    if(currentTrackIndex===0){
        return;
    }
    currentTrackIndex-=1;
    playSong();
})
nextBtn.addEventListener("click", () => {
    if(currentTrackIndex===tracks.length-1){
        return;
    }
    currentTrackIndex+=1;
    playSong();
})
const playSong= () => {
    const currentSong= tracks[currentTrackIndex].trackId;
    isPlaying=true;
    audioTag.src=currentSong;
    audioTag.play();
    playAndPauseTag();
}
// const setProgress=(e) => {
//     currentProgressTag.style.width= this.width ;
//     const clickX= e.offSetX;
//     const duration=audioTag.duration;
//     duration.currentTime=(clickX/width)*duration;

// }
// currentProgressTag.addEventListener("click",setProgress);

const playAndPauseTag=()=>{
if(isPlaying){
    playBtn.style.display="none";
    pauseBtn.style.display="inline";
}else{
    playBtn.style.display="inline";
    pauseBtn.style.display="none";
}
}
