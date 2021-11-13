import styled from "styled-components";
import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import useSupercluster from "use-supercluster";
import { restaurantsApi } from "../../api/restaurantsApi";

import { CurrentPage } from "../../context/CurrentPage";

const API_KEY = "AIzaSyAezZA013EDJ-g4Dc4-o5KtwWLX1fOh2UU";

export default function Map(props) {
  const { status, setStatus } = useContext(CurrentPage);

  const { page } = useContext(CurrentPage);
  const [zoom, setZoom] = useState(11);
  const [bounds, setBounds] = useState();
  const [mapData, setMapData] = useState([]);
  // const [status, setStatus] = useState(false);

  const [isBtnHidden, setIsBtnHidden] = useState(true);

  const defaultProps = {
    center: {
      lat: 40.712763282042324,
      lng: -74.00638318300064,
    },

    zoom: 11,
  };

  // const mapRef = useRef();

  const points = mapData
    ?.filter((el) => el.cuisine.includes(props.markerFilter))
    .map((crime) => ({
      type: "Feature",
      properties: {
        cluster: false,
        crimeId: crime._id,
        category: crime.cuisine,
      },
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(crime.address.coord[0]),
          parseFloat(crime.address.coord[1]),
        ],
      },
    }));

  const { clusters } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 95, maxZoom: 20 },
  });

  useEffect(() => {
    async function fetchData(initialValue = 1) {
      const { res } = await restaurantsApi(initialValue);
      setMapData(res.data);
    }

    async function mapOn() {
      try {
        if (
          zoom > defaultProps.zoom ||
          zoom < defaultProps.zoom ||
          bounds[1] > defaultProps.center.lat ||
          bounds[3] < defaultProps.center.lat ||
          bounds[0] > defaultProps.center.lng ||
          bounds[2] < defaultProps.center.lng
        ) {
          setIsBtnHidden(false);
        } else {
          setIsBtnHidden(true);
        }
      } catch (error) {}
    }
    if (!status) {
      fetchData(page);
    }
    mapOn();
  }, [
    page,
    zoom,
    defaultProps.zoom,
    bounds,
    defaultProps.center.lat,
    defaultProps.center.lng,
    status,
  ]);

  return (
    <MapContainer>
      <RestoreBtn
        disabled={isBtnHidden}
        style={{ opacity: `${isBtnHidden ? "0" : "1"}` }}
        onClick={() => {
          props.mapRef.current.panTo({
            lat: defaultProps.center.lat,
            lng: defaultProps.center.lng,
          });
          props.mapRef.current.setZoom(defaultProps.zoom);
        }}
      >
        Return
      </RestoreBtn>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          props.mapRef.current = map;
        }}
        onChange={({ zoom, bounds }) => {
          setZoom(zoom);
          setBounds([
            bounds.nw.lng,
            bounds.se.lat,
            bounds.se.lng,
            bounds.nw.lat,
          ]);
        }}
      >
        {clusters.map((cluster, index) => {
          const [longitude, latidute] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={index + Math.random() * 55}
                lat={latidute}
                lng={longitude}
              >
                <PointCluster
                  onClick={() => {
                    props.mapRef.current.panTo({
                      lat: latidute,
                      lng: longitude,
                    });
                    props.mapRef.current.setZoom(zoom + 2);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {pointCount}
                </PointCluster>
              </Marker>
            );
          } else {
            return (
              <Marker
                key={cluster.properties.crimeId}
                lat={latidute}
                lng={longitude}
              >
                <FaMapMarkerAlt color="red" size="2em" />
              </Marker>
            );
          }
        })}
      </GoogleMapReact>
    </MapContainer>
  );
}
const RestoreBtn = styled.button`
  z-index: 15;
  position: absolute;
  transition: 0.3s ease;
  padding: 0.5em 1.5em;
  border: 0.15em solid #054070;
  top: 1em;
  left: 1.5em;
  background: #f0f0f0;
  border-radius: 4px;
  :hover {
    cursor: pointer;
  }
  :disabled {
    cursor: default;
  }
`;

const Marker = ({ children }) => children;

const MapContainer = styled.div`
  position: relative;
  width: 65%;
  height: 100vh;
  background: #8d8d8d;
`;
const PointCluster = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #054070;
  color: white;
  border-radius: 50%;
  width: 1px;
  height: 1px;
  padding: 1.5em;
  font-size: 1.3em;
  font-weight: 700;
`;
