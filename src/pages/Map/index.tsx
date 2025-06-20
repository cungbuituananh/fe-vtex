import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import MapFilterSidebar from "./MapFilterSidebar";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import SearchResult from "./SearchResult";

function MapPage() {
  const mapContainerRef = useRef(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const handleMapboxSearch = (result: any) => {
    console.log("result>>>>: ", result);
    // setSearchResults((prev) => [...prev, result]);
  };

  useEffect(() => {
    // Initialize the map
    mapboxgl.accessToken = "pk.eyJ1IjoiYW5oY2J0IiwiYSI6ImNtYWdodXlxNzAxN2oyd29rMDg1aGRkMXYifQ.jgSnB9tSRXYMB5ZD1iGGJg";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [105.854444, 21.028511], // Center on Hanoi
      zoom: 3,
      minZoom: 1,
      maxBounds: [
        [102.14441, 8.1952], // Southwest coordinates (approx. SW Vietnam)
        [109.4642, 23.3934], // Northeast coordinates (approx. NE Vietnam)
      ],
      style: "mapbox://styles/mapbox/streets-v12", // Set map type to satellite-streets
    });

    // Add navigation controls
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-left"
    );
    // map.addControl(new mapboxgl.FullscreenControl(), "top-right");
    // map.addControl(new mapboxgl.ScaleControl(), "bottom-right");

    // // Add the geocoder (search bar)
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken as string,
      mapboxgl: mapboxgl,
      countries: "vn", // Limit searches to Vietnam
      placeholder: "Tìm kiếm địa điểm...",
      marker: true,
      flyTo: {
        speed: 1.2,
        curve: 1.42,
        easing: (t) => t,
      },
    });

    geocoder.on("result", (e) => {
      handleMapboxSearch(e.result); // Call the handler
      // ...existing marker code...
    });

    const locationPoints = [
      { coordinates: [105.854444, 21.028511], label: "Hà Nội" },
      { coordinates: [106.660172, 10.762622], label: "Hồ Chí Minh" },
      { coordinates: [108.238889, 16.047079], label: "Đà Nẵng" },
      { coordinates: [105.781111, 10.012222], label: "Cần Thơ" },
      { coordinates: [106.683333, 20.864444], label: "Hải Phòng" },
    ];

    // Function to add multiple markers
    const addMarkersToMap = (
      map: mapboxgl.Map,
      locations: typeof locationPoints
    ) => {
      const newMarkers: mapboxgl.Marker[] = [];

      locations.forEach((location, index) => {
        // Define different colors for different markers
        const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];
        const markerColor = colors[index % colors.length];
        const marker = new mapboxgl.Marker({ color: markerColor })
          .setLngLat(location.coordinates as [number, number])
          .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.label}</h3>`))
          .addTo(map);

        newMarkers.push(marker);
      });

      setMarkers(newMarkers);
    };

    // Wait for map to load before adding markers
    map.on("load", () => {
      // Add all predefined markers
      addMarkersToMap(map, locationPoints);
    });

    // Function to clear all markers
    const clearAllMarkers = () => {
      markers.forEach((marker) => marker.remove());
      setMarkers([]);
    };

    // Add the geocoder to the map
    // map.addControl(geocoder, "top-left");

    // Listen for the `result` event from the geocoder
    // geocoder.on("result", (e) => {
    //   // You can access the selected result details here
    //   console.log("Search result:", e.result);
    //   setSearchResults([...searchResults, e.result]);

    //   // Add a marker at the found location
    //   new mapboxgl.Marker()
    //     .setLngLat(e.result.center)
    //     .setPopup(
    //       new mapboxgl.Popup().setHTML(`<h3>${e.result.place_name}</h3>`)
    //     )
    //     .addTo(map);
    // });

    // Cleanup on component unmount
    clearAllMarkers();
    return () => map.remove();
  }, []);

  return (
    <div
      style={{
        height: "90vh",
        position: "relative",
      }}
    >
      {/* <div style={{ position: "absolute", top: 0, left: 0, zIndex: 10 }}>
        <MapFilterSidebar onSearch={handleMapboxSearch} />
      </div> */}
      <div
        className="container-map"
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%" }}
      >
        <MapFilterSidebar onSearch={handleMapboxSearch} />
        <SearchResult />
      </div>
    </div>
  );
}

export default MapPage;
