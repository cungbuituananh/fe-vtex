import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import MapFilterSidebar from "./MapFilterSidebar";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import SearchResult from "./SearchResult";
import "./map.css";
import { MOCKDATA_COMPANY } from "../Company/mockdata";

const MOCK_DATA = [
  { coordinates: [105.854444, 21.028511], label: "Hà Nội", id: 1 },
  { coordinates: [106.660172, 10.762622], label: "Hồ Chí Minh", id: 2 },
  { coordinates: [108.238889, 16.047079], label: "Đà Nẵng", id: 3 },
  { coordinates: [105.781111, 10.012222], label: "Cần Thơ", id: 4 },
  { coordinates: [106.683333, 20.864444], label: "Hải Phòng", id: 5 },
];

function MapPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const handleMapboxSearch = (result: any) => {
    console.log("searchResults: ", searchResults);
    console.log("result>>>>: ", result);
    setSearchResults((prev) => [...prev, result]);
  };

  // Function to search in MOCK_DATA - only triggered on explicit search
  const handleLocalSearch = () => {
    // if (!searchTerm.trim()) {
    //   setFilteredData([]);
    //   clearAllMarkers();
    //   return;
    // }

    // const filtered = MOCK_DATA.filter((item) =>
    //   item.label.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    setFilteredData(MOCKDATA_COMPANY);

    // Add markers for filtered results
    if (mapRef.current) {
      addMarkersToMap(mapRef.current, MOCKDATA_COMPANY);
      if (MOCKDATA_COMPANY.length > 0) {
        // Fit map to show filtered results
        const bounds = new mapboxgl.LngLatBounds();
        MOCK_DATA.forEach((location) => {
          bounds.extend(location.coordinates as [number, number]);
        });
        mapRef.current.fitBounds(bounds, { padding: 50 });
      }
    }
  };

  // Function to add multiple markers
  const addMarkersToMap = (map: mapboxgl.Map, locations: any[]) => {
    // Clear existing markers first
    clearAllMarkers();

    const newMarkers: mapboxgl.Marker[] = [];

    locations.forEach((location, index) => {
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

  // Function to clear all markers
  const clearAllMarkers = () => {
    markers.forEach((marker) => marker.remove());
    setMarkers([]);
  };

  // Function to show all MOCK_DATA on map
  // const showAllLocations = () => {
  //   setFilteredData(MOCK_DATA);
  //   if (mapRef.current) {
  //     addMarkersToMap(mapRef.current, MOCK_DATA);

  //     // Fit map to show all markers
  //     const bounds = new mapboxgl.LngLatBounds();
  //     MOCK_DATA.forEach((location) => {
  //       bounds.extend(location.coordinates as [number, number]);
  //     });
  //     mapRef.current.fitBounds(bounds, { padding: 50 });
  //   }
  // };

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [105.854444, 21.028511],
      zoom: 6, // Increased zoom to better see Vietnam
      minZoom: 1,
      maxBounds: [
        [102.14441, 8.1952],
        [109.4642, 23.3934],
      ],
      style: "mapbox://styles/mapbox/streets-v12",
    });

    // Store map reference
    mapRef.current = map;

    // Add navigation controls to avoid conflict with search
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-left"
    );

    // Add the geocoder
    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken as string,
      mapboxgl: mapboxgl as any,
      countries: "vn",
      placeholder: "Tìm kiếm địa điểm...",
      marker: false, // Disable default marker to use custom ones
      flyTo: {
        speed: 1.2,
        curve: 1.42,
        easing: (t: any) => t,
      },
    });

    geocoder.on("result", (e) => {
      handleMapboxSearch(e.result);
    });

    // map.addControl(geocoder, "top-left");

    // Load all locations initially
    // map.on("load", () => {
    //   showAllLocations();
    // });

    return () => {
      clearAllMarkers();
      map.remove();
    };
  }, []);

  return (
    <div style={{ height: "90vh", position: "relative" }}>
      <div
        className="container-map"
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%" }}
      >
        <MapFilterSidebar
          onSearch={handleLocalSearch}
          // onShowAll={showAllLocations}
          // onClear={clearAllMarkers}
        />
        {filteredData.length > 0 && (
          <SearchResult
            results={filteredData}
            onResultClick={(location) => {
              if (mapRef.current) {
                mapRef.current.flyTo({
                  center: location.coordinates as [number, number],
                  zoom: 12,
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

export default MapPage;
