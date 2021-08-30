import React, { useEffect, useRef, useState } from "react";
import {
    Map,
    TileLayer,
    Marker,
    FeatureGroup,
    withLeaflet,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "./Map.scss";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import locatePoint from "../Assets/locate.svg";

import PrintControlDefault from "react-leaflet-easyprint";
const PrintControl = withLeaflet(PrintControlDefault);

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const myIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [25, 40],
    iconAnchor: [17, 35],
});

/*
// #region staticmap
const interactionControls = {
    zoomControl: false,
    doubleClickZoom: false,
    closePopupOnClick: false,
    dragging: false,
    zoomSnap: false,
    zoomDelta: false,
    trackResize: false,
    touchZoom: false,
    scrollMouseWheelZoom: false,
};
// #endregion
*/

function MapComponent({ center, zoom }) {
    const mapRef = useRef();
    const printControlRef = useRef();
    const [mapLayers, setMapLayers] = useState([]);

    // #region geoLocation
    const [geoLocation, setGeoLocation] = useState({
        loaded: false,
        coordinates: { lat: "", lng: "" },
    });

    const goToMyLocation = () => {
        if (geoLocation.loaded && !geoLocation.error) {
            mapRef.current.leafletElement.flyTo(
                [geoLocation.coordinates.lat, geoLocation.coordinates.lng],
                zoom,
                { animate: true }
            );
        } else {
            alert(geoLocation.error.message);
        }
    };

    const onSuccess = (location) => {
        setGeoLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    const onError = (error) => {
        setGeoLocation({
            loaded: false,
            error,
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setGeoLocation((prev) => ({
                ...prev,
                loaded: true,
                error: {
                    code: 0,
                    message: "GeoLocation is not supported",
                },
            }));
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);
    // #endregion

    // #region shapes
    const _onCreate = (e) => {
        console.log(e);

        const { layerType, layer } = e;
        if (layerType === "polygon") {
            const { _leaflet_id } = layer;

            setMapLayers((layers) => [
                ...layers,
                { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
            ]);
        }
    };

    console.log(mapLayers);

    const _onEdited = (e) => {
        console.log(e);

        const {
            layers: { _layers },
        } = e;

        Object.values(_layers).map(({ _leaflet_id, editing }) => {
            setMapLayers((layers) =>
                layers.map((l) =>
                    L.id === _leaflet_id
                        ? { ...l, latlngs: { ...editing.latlngs[0] } }
                        : l
                )
            );
        });
    };
    const _onDeleted = (e) => {
        console.log(e);

        const {
            layers: { _layers },
        } = e;

        Object.values(_layers).map(({ _leaflet_id }) => {
            setMapLayers((layers) =>
                layers.filter((l) => l.id !== _leaflet_id)
            );
        });
    };
    // #endregion

    return (
        <div className="mapcomponent">
            <Map center={center} zoom={zoom} ref={mapRef}>
                <FeatureGroup>
                    <EditControl
                        position="topright"
                        onCreated={_onCreate}
                        onEdited={_onEdited}
                        onDeleted={_onDeleted}
                    />
                </FeatureGroup>

                <PrintControl
                    ref={printControlRef}
                    position="topleft"
                    sizeModes={["Current", "A4Portrait", "A4Landscape"]}
                    hideControlContainer={false}
                />

                <PrintControl
                    position="topleft"
                    sizeModes={["Current", "A4Portrait", "A4Landscape"]}
                    hideControlContainer={false}
                    title={"Export as PNG"}
                    exportOnly
                />

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    minZoom={0}
                    maxNativeZoom={19}
                    maxZoom={22}
                />

                <Marker position={center} icon={myIcon} />

                {geoLocation.loaded && !geoLocation.error && (
                    <Marker position={geoLocation.coordinates} icon={myIcon} />
                )}
            </Map>
            <div className="mapcomponent__tools">
                <button
                    className="tools__polygon"
                    onClick={(e) => goToMyLocation()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                    >
                        <path d="M0 0h48v48h-48z" fill="none" />
                        <path d="M24 16c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm17.88 6c-.92-8.34-7.54-14.96-15.88-15.88v-4.12h-4v4.12c-8.34.92-14.96 7.54-15.88 15.88h-4.12v4h4.12c.92 8.34 7.54 14.96 15.88 15.88v4.12h4v-4.12c8.34-.92 14.96-7.54 15.88-15.88h4.12v-4h-4.12zm-17.88 16c-7.73 0-14-6.27-14-14s6.27-14 14-14 14 6.27 14 14-6.27 14-14 14z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default MapComponent;
