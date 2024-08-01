import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import DisplayTags from "../components/DisplayTags";
import LaunchIcon from '@mui/icons-material/Launch';
import Paper from '@mui/material/Paper';

import { useGlobalAudioPlayer } from 'react-use-audio-player';
import AddDisplayTags from '../components/AddDisplayTags';


const Video = () => {
  const { id } = useParams();
  const [audioUrl, setAudioUrl] = useState();
  const videoElement = useRef<HTMLVideoElement>(null);

  const handleTimeStampClick = (timeStamp: string) => {
    const time = timeStamp.split(":");
    const seconds = parseInt(time[0]) * 60 * 60
      + parseInt(time[1]) * 60
      + parseInt(time[2]);
    if (videoElement && videoElement.current) {
      videoElement.current.currentTime = Number(seconds);
      videoElement.current.play();
    }
  };

  const tapeMetaData = useAppSelector(state =>
    state.allTapes.find(m => m.id === id));
  console.log({ tapeMetaData });
  useEffect(() => {
    // // call API to get movie stream URL
    axios
      .get(`${process.env["NX_METADATA_API_URL"]}api/v2/Tapes/${id}/audio`)
      .then(resp => {
        console.log({ resp });
        setAudioUrl(resp.data.audioUrl);
      });

  }, [id]);

  if (!tapeMetaData) {
    return <div>Loading...</div>;
  }
  return (
    <div className='video-page'>

      <Paper className="video-details"
        sx={{
          margin: '1rem',
          padding: '2rem',
          width: '100%',
        }}
        elevation={5}
      >
        <h1>{tapeMetaData.title} <a target="_blank"
          href={audioUrl} rel="noreferrer"><LaunchIcon /></a></h1>
        <section className='video-container'>
          {audioUrl ?
            <section className="video">
              <audio controls src={audioUrl}></audio>
            </section>
            :
            <>loading video url</>}
        </section>
        <ul>
          {tapeMetaData.audioTimeStamps?.map((timeStamp, i) => (
            <li key={i} className="moment">
              <span className="time-stamp"
                onClick={() => handleTimeStampClick(timeStamp.timeStamp)}>
                {timeStamp.timeStamp}
              </span> -- {timeStamp.description}
            </li>
          ))}
        </ul>
        <DisplayTags tags={tapeMetaData.tags} />
        <AddDisplayTags id={tapeMetaData.id} />
      </Paper>
    </div >
  );
};

export default Video;