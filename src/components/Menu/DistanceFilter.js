import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import * as turf from "@turf/turf";

export default class DistanceFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distanceVisible: []
    };
  }

  setFilter = e => {
    let { filterDistance, searchCenter, providers } = this.props;
    const distance = e.target.value;
    const distances = providers.map(provider => {
      return {
        provider: provider,
        distance: turf.distance(
          turf.point(provider.geometry.coordinates),
          turf.point(searchCenter)
        )
      };
    });
    const closePlaces = distances
      .filter(el => el.distance < distance)
      .map(el => el.provider);

    console.log(closePlaces);

    filterDistance(closePlaces);

    this.setState({ distanceVisible: distance });
  };

  clearFilter = () => {
    let { filterDistance, providers } = this.props;
    filterDistance(providers);
  };

  render() {
    const distances = [1, 2, 5];
    return (
      <ul>
        {distances.map((el, i) => (
          <li key={i}>
            <div>
              <input
                type="radio"
                name={"distance"}
                id={el}
                value={el}
                onChange={e => this.setFilter(e)}
                checked={this.state.distanceVisible === el}
              />
            <label htmlFor={el}>{el + " miles"}</label>
            </div>
          </li>
        ))}
        <button onClick={this.clearFilter}>Clear filter</button>
      </ul>
    );
  }
}
