import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import InputImage from './components/InputImage';
import Landing from './components/Landing'
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
        <Switch>
          <Route path="/home" exact component={InputImage} />
          <Route path="/"  exact component={Landing} />
        </Switch>
      </BrowserRouter>

  {/* <InputImage/> */}
    </div>
  );
}

export default App;
