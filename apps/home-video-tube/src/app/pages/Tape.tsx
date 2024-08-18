import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import LaunchIcon from '@mui/icons-material/Launch';
import Paper from '@mui/material/Paper';

import AddDisplayTags from '../components/AddDisplayTags';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


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
  const imageUrl =
    `${process.env["NX_METADATA_API_URL"]}api/v2/Tapes/${id}/image`;
  const tapeMetaData = useAppSelector(state =>
    state.allTapes.find(m => m.id === id));
  useEffect(() => {
    // // call API to get movie stream URL
    axios
      .get(`${process.env["NX_METADATA_API_URL"]}api/v2/Tapes/${id}/audio`)
      .then(resp => {
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
            <section className="audio">
              <AudioPlayer
                src={audioUrl}
                showJumpControls={false}
                customVolumeControls={[]}
                customAdditionalControls={[]} />
            </section>
            :
            <>loading tape deck</>}
        </section>
        <AddDisplayTags id={tapeMetaData.id} tags={tapeMetaData.tags} />
      </Paper>
      <Paper className="tape-image"
        sx={{
          margin: '1rem',
          marginTop: '0',
          padding: '2rem',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        elevation={5}
      >
      </Paper>
    </div >
  );
};

export default Video;