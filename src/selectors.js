import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import * as turf from "@turf/turf";

export default function getProvidersByDistance( searchCenter, providers, distance ) {
    searchCenter = searchCenter || [-71.066954, 42.359947];
    
    const distances = providers.map(provider => {
      return {
        provider: provider,
        distance: turf.distance(
          turf.point(provider.coordinates),
          turf.point(searchCenter)
        )
      };
    });

    const closePlaces = distances
      .filter(el => el.distance < distance)
      .sort( (ela,elb) => ela.distance - elb.distance )
      .map(el => el.provider);

    console.log(closePlaces.length, "of", providers.length, "within", distance, "miles");


  return closePlaces;
}