import React, {Component} from 'react';
import Clarifai from "clarifai";
import Particles from 'react-particles-js';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/Logo";
import LinkForm from "./components/linkForm/LinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognize from "./components/FaceRecognize/FaceRecognize";
import './App.css';
import "tachyons";

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
const app = new Clarifai.App({apiKey: '03417c361fea4a01ae5c4185c09347f0'});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: "",
            box:{}
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = (data.outputs[0].data.regions[0].region_info.bounding_box);
        const image = document.getElementById("inputImage");
        const height = Number(image.height);
        const width = Number(image.width); 
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * height,
            rightCol: width - (clarifaiFace.right_col * width),
            bottomRow: height - (clarifaiFace.bottom_row * height)
          }
    }

    displayFaceBox = (box) => {
        this.setState({box : box})
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app
            .models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response =>this.displayFaceBox( this.calculateFaceLocation(response)))
            .catch(err => console.log(err));
    }
    render() {
        return (
            <div >
                <Particles className="particle" params={particleOption}/>
                <Navigation/>
                <Logo/>
                <Rank/>
                <LinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}/>
                <FaceRecognize 
                imageUrl={this.state.imageUrl}
                box ={this.state.box}
                />
            </div>
        );
    }
}

export default App;