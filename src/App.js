import React, {Component} from 'react';
import './App.css';
import "tachyons";
import Particles from 'react-particles-js';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import LinkForm from "./components/linkForm/LinkForm";
import Rank from "./components/Rank/Rank";

const particleOption = {
    particles: {
        number: {
            value: 50,
            density: {
                enable: true,
                value_area: 400
            }
        }
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            input: ' '
        }
    }
    onInputChange(event){
      console.log(event.target.value);
    }
    render() {
        return (<div >
            <Particles className="particle" params={particleOption}/>
            <Navigation/>
            <Logo/>
            <Rank/>
            <LinkForm/> {/*
            <FaceRecognize/>}
            */}
        </div>
        );
  }
}

export default App;