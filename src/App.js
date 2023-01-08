import { BrowserRouter as Router, Route } from 'react-router-dom';
import MissionDetails from './MissionDetails';
import MyComponent from './MyComponent'

function App() {
  return (
    <Router>
      <Route exact path="/" component={MyComponent} />
      <Route path="/mission/:missionId" component={MissionDetails} />
    </Router>
  );
}

export default App;
