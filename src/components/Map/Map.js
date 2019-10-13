import React from 'react';

import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import { FormControl, Select, MenuItem, FormHelperText} from '@material-ui/core';

const MyMapComponent = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=place&key=${process.env.REACT_APP_MAP}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>

    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 44.952228, lng: -93.2791737 }}
    >
        {props.isMarkerShown &&
            <MarkerWithLabel
                position={{ lat: 44.952228, lng: -93.2791737 }}
                // labelAnchor={new google.maps.Point(0, 0)}
                labelStyle={{ backgroundColor: "yellow", fontSize: "32px", padding: "16px" }}
            >
                <div>Simpson Housing Services</div>
            </MarkerWithLabel>}
    </GoogleMap>
)


export default MyMapComponent;
