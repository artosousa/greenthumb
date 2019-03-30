import React from 'react';

export default function PlantImage (props){
    if(!props.plant.images || !props.plant.images.length){
        return null;
    }
    return <img src={props.plant.images[0].url} />;
}