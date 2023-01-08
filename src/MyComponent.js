import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';

function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const history = useHistory();
  
    useEffect(() => {
      fetch("https://api.spacexdata.com/v3/launches")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, []);
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(5, 1fr)', gridColumnGap: '10px', gridRowGap: '10px', backgroundColor: 'black',    padding: '10px'}} className='wrapper'>
          {items.map(item => (
            <div 
              id='grid-item' 
              key={item.flight_number} 
              style={{ backgroundColor: "rgb(52,152,219)", color:'white', border: '1px solid rgba(0, 0, 0, 0.8)',
                padding: '20px',
                fontSize: '30px',
                textAlign: 'center',
                borderRadius:'20px'}}
              onClick={() => history.push(`/mission/${item.flight_number}`)}
            >
              <h4>{item.mission_name}</h4>
              <img style={{width: '100px', height:'100px'}}   src={item.links.mission_patch}/>
              <p>Launch Year : {item.launch_year}</p>
              <p>Rocket : {item.rocket.rocket_name}</p>
            </div>
          ))}
        </div>
      );
    }
  }
  
  export default MyComponent