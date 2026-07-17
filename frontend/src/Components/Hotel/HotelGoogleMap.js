import React, { Component } from "react";
class HotelGoogleMap extends Component {
    render() {
        const lng = parseFloat(this.props.x).toFixed(7);
        const lat = parseFloat(this.props.y).toFixed(7);
        console.log(lng, lat);
        return (
            <iframe
                title="Hotel Location"
                width="100%"
                height="450"
                frameBorder="0"
                scrolling="no"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.003}%2C${lat - 0.003}%2C${lng + 0.003}%2C${lat + 0.003}&layer=mapnik&marker=${lat}%2C${lng}`}
            />
        );
    }
}

export default HotelGoogleMap;
