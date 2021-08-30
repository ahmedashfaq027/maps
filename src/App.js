import React from "react";
import "./App.scss";
import MapComponent from "./Components/MapComponent";

/*const myIcon = L.icon({
    iconUrl: icon,
    iconSize: [22, 35],
    iconAnchor: [12.41, 41],
    popupAnchor: [0, -41],
});*/

/*
const togglePolygonActive = (e) => {
        if (polygonActive) {
            setCoords((prev) => [...prev, currCoords]);
            multiPolygon.push(currCoords);
            setCurrCoords([]);
        }

        setPolygonActive(!polygonActive);
    };

    const handleClick = (e) => {
        const latlng = [e.latlng.lat, e.latlng.lng];

        if (polygonActive) {
            setCurrCoords((prev) => [...prev, latlng]);
            console.log(currCoords);
        }
    };
*/

function App() {
    // const position = [17.385, 78.4867];
    // const [onselect, setOnselect] = useState({});
    // const position = [1.286389, 38.817223];
    const center = { lat: 17.494736, lng: 78.439588 };
    const zoom = 15;
    /*const poss = [
        [17.3852, 78.4861],
        [17.384, 78.4877],
        [17.3854, 78.4857],
    ];
    
    /*{
        poss.map((pos) => (
            <Marker position={pos} icon={myIcon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        ));
    }*/

    // const style = (feature) => ({
    //     fillColor: "#a50f15",
    //     weight: 2,
    //     opacity: 1,
    //     color: "black",
    //     dashArray: 2,
    //     fillOpacity: 0.5,
    // });

    // const onEachFeature = (feature, layer) => {
    //     layer.on({ mouseover: highlightFeature, mouseout: resetHighlight });
    // };

    // const highlightFeature = (e) => {
    //     var layer = e.target;
    //     const { name, id } = e.target.feature.properties;
    //     setOnselect({
    //         name,
    //         id,
    //     });
    //     layer.setStyle({
    //         weight: 1,
    //         color: "black",
    //         fillOpacity: 1,
    //     });
    // };
    // /*resets our state i.e no properties should be displayed when a feature is not clicked or hovered over */
    // const resetHighlight = (e) => {
    //     setOnselect({});
    //     e.target.setStyle(style(e.target.feature));
    // };

    // const mapPolygonColorToDensity = (density) => {
    //     return density > 3023
    //         ? "#a50f15"
    //         : density > 676
    //         ? "#de2d26"
    //         : density > 428
    //         ? "#fb6a4a"
    //         : density > 236
    //         ? "#fc9272"
    //         : density > 23
    //         ? "#fcbba1"
    //         : "#fee5d9";
    // };

    return (
        <div className="app">
            <div className="app__left">
                <MapComponent center={center} zoom={zoom} />
            </div>
            <div className="app__right"></div>
            {/* <LeafletMap center={position} zoom={zoom} maxZoom={22}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {statesData && (
                        <GeoJSON
                            data={statesData}
                            style={style}
                            onEachFeature={onEachFeature}
                        />
                    )}
                </LeafletMap> */}
        </div>
    );
}

export default App;
