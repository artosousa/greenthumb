import React from "react";
import "./plant.css";
import PlantImage from "./plantimage";

class Plant extends React.Component {
  handleClick = () => {
    this.props.selectPlant(this.props.plant);
  };

  render() {
    const title = this.props.plant.common_name;
    
    //const image = this.props.plant.images[0].url;
    //const [image] = this.props.plant.images;
    //console.log(this.props.plant.images);

    return (
      
        <div className="col s12 m4 l3">
          <div className="card medium" onClick={this.handleClick}>
            <div className="card-image">
              <PlantImage key={this.props.plant.id} plant={this.props.plant} />
              <span className="card-title">{title}</span>
            </div>
          </div>
        </div>
    );
  }
}

export default Plant;
