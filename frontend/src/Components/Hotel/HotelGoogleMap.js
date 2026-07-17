import React, { Component } from "react";

class HotelGoogleMap extends Component {
    render() {
        // X = Longitude
        const lng = Number(parseFloat(this.props.x).toFixed(7));

        // Y = Latitude
        const lat = Number(parseFloat(this.props.y).toFixed(7));

        const delta = 0.003;

        const minLng = lng - delta;
        const minLat = lat - delta;
        const maxLng = lng + delta;
        const maxLat = lat + delta;

        const src = `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lng}`;

        return (
            <iframe
                title="Hotel Location"
                width="100%"
                height="450"
                frameBorder="0"
                scrolling="no"
                style={{ border: 0 }}
                src={src}
            />
        );
    }
}

export default HotelGoogleMap;