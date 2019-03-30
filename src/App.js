import React, { Component } from "react";

import "./App.css";
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import Plant from "./components/plant";
import PlantImage from "./components/plantimage";
import Loading from "./components/loading";
import SiteNav from "./components/navigation";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      plants: [],
      selectedPlant: null
    };
  }

  componentDidMount() {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://trefle.io/api/species?token=MHlEQlVnNnhnaEhyQk9uUXJaUmNGQT09";
    fetch(proxyUrl + url)
    .then(response => response.json())
    .then(data => {
        const promises = data.map( plant => {
          const url = `https://trefle.io/api/species/${plant.id}?token=MHlEQlVnNnhnaEhyQk9uUXJaUmNGQT09`;
          return fetch(proxyUrl + url)
          .then(response => response.json())
          
        })
        return Promise.all(promises)
      })
      .then(plants => {
        this.setState({
          loading: false,
          plants
        })
      }) 
      .catch(error => {
        console.log(error.message);
      });
  }

  selectPlant = plant => {
    this.setState({
      selectedPlant: plant
    });
  };

  deselectPlant = () => {
    this.setState({
      selectedPlant: null
    });
  }

  render() {
    if(this.state.selectedPlant){
      return (
        <div>
          <SiteNav/>
          <div className="container">
            <div class="card horizontal">
              <div class="card-image">
                <PlantImage plant={this.state.selectedPlant} />
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <h5>{this.state.selectedPlant.common_name}</h5>
                </div>
                <div class="card-action">
                  <button  className="btn" onClick={this.deselectPlant}>Go Back</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="plants-list">
        <SiteNav/>
        
          <div className="row">
            {this.state.loading ? <Loading /> : this.state.plants.map(plant => {
              return (
                <div className="container">
                  <Plant
                    key={plant.id}
                    plant={plant}
                    selectPlant={this.selectPlant}
                  />
                </div>
              );
            })}
          </div>
      </div>
    );
  }
}

export default App;
