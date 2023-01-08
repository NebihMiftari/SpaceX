import React, { useState, useEffect } from "react";
import fetch from "isomorphic-fetch";
import Comments from "./Comments";
import "./MissionDetails.css";
function MissionDetails(props) {
  const [item, setItem] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`https://api.spacexdata.com/v3/launches/${props.match.params.missionId}`)
      .then(res => res.json())
      .then(result => setItem(result));
    fetch(`http://localhost:3000/comments?missionId=${props.match.params.missionId}`)
      .then(res => res.json())
      .then(result => setComments(result));
  }, []);

  return (
    <div className="mission-details">
      <div className="details">
        <h1>{item.mission_name}</h1>
        {item.links && item.links.mission_patch ? (
          <img style={{ width: "100px", height: "100px" }} src={item.links.mission_patch} />
        ) : (
          <p>Mission patch not available</p>
        )}
        <h2>Launch Year: {item.launch_year}</h2>
        {item.rocket && item.rocket.rocket_name ? (
          <p>Rocket: {item.rocket.rocket_name}</p>
        ) : (
          <h2>Rocket name not available</h2>
        )}
        {item.rocket && item.rocket.rocket_type ? (
          <h2>Rocket Type: {item.rocket.rocket_type}</h2>
        ) : (
          <p>Rocket type not available</p>
        )}
        <p>Details: {item.details}</p>
      </div>
      <div className="comments">
        <Comments comments={comments} missionId={props.match.params.missionId} setComments={setComments} />
      </div>
    </div>
  );
}

export default MissionDetails;
