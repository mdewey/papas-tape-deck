import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import DisplayTags from "../components/DisplayTags";
import LaunchIcon from '@mui/icons-material/Launch';
import Paper from '@mui/material/Paper';
const Video = () => {
  const { id } = useParams();
  const [videoUrl, setVideoUrl] = useState();
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

  const movieMetaData = useAppSelector(state =>
    state.allMovies.find(m => m.id === id));
  useEffect(() => {
    // call API to get movie stream URL
    axios
      .get(`${process.env["NX_METADATA_API_URL"]}api/v2/Movies/${id}/video`)
      .then(resp => {
        setVideoUrl(resp.data.videoUrl);
      });

  }, [id]);

  if (!movieMetaData) {
    return <div>Loading...</div>;
  }
  console.log({ videoElement });
  return (
    <div className='video-page'>
      <section className='video-container'>
        {videoUrl ?
          <section className="video">
            <video controls ref={videoElement}>
              <source src={videoUrl} type="video/mp4" />
            </video>
          </section>
          :
          <>loading video url</>}
      </section>
      <Paper className="video-details"
        sx={{
          margin: '1rem',
          padding: '2rem',
          width: '100%',
        }}
        elevation={5}
      >
        <h1>{movieMetaData.title} <a target="_blank"
          href={videoUrl} rel="noreferrer"><LaunchIcon /></a></h1>
        <ul>
          {movieMetaData.videoTimeStamps.map((timeStamp, i) => (
            <li key={i} className="moment">
              <span className="time-stamp"
                onClick={() => handleTimeStampClick(timeStamp.timeStamp)}>
                {timeStamp.timeStamp}
              </span> -- {timeStamp.description}
            </li>
          ))}
        </ul>
        <DisplayTags tags={movieMetaData.tags} />

      </Paper>
    </div>
  );
};

export default Video;