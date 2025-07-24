import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import MapFilterSidebar from "./MapFilterSidebar";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import SearchResult from "./SearchResult";
import "./map.css";
import { MOCKDATA_COMPANY } from "../Company/mockdata";
import { getListCompanyPublicAPI } from "@/services/apis/common";

const MOCK_DATA = [
  { coordinates: [105.854444, 21.028511], label: "Hà Nội", id: 1 },
  { coordinates: [106.660172, 10.762622], label: "Hồ Chí Minh", id: 2 },
  { coordinates: [108.238889, 16.047079], label: "Đà Nẵng", id: 3 },
  { coordinates: [105.781111, 10.012222], label: "Cần Thơ", id: 4 },
  { coordinates: [106.683333, 20.864444], label: "Hải Phòng", id: 5 },
];

interface MapPageProps {
  isSelectScreen?: boolean; // Optional prop to determine if it's a selection screen
}

function MapPage({ isSelectScreen = false }: MapPageProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const selectedMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const handleMapboxSearch = (result: any) => {
    setSearchResults((prev) => [...prev, result]);
  };

  // Function to search in MOCK_DATA - only triggered on explicit search
  const handleLocalSearch = async (values: any) => {
    const {
      data: { content },
    } = await getListCompanyPublicAPI(values);

    if (content?.length > 0) {
      const temp = content.map((item: any) => ({
        ...item,
        coordinates: [Number(item.longitude), Number(item.latitude)],
      }));
      setFilteredData(temp);

      // Add markers for filtered results
      if (mapRef.current) {
        addMarkersToMap(mapRef.current, temp);
        if (temp.length > 0) {
          // Fit map to show filtered results
          const bounds = new mapboxgl.LngLatBounds();
          temp.forEach((location: any) => {
            bounds.extend(location.coordinates as [number, number]);
          });
          mapRef.current.fitBounds(bounds, { padding: 50 });
        }
      }
    }
  };

  // Handle map click to add a marker
  const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
    const { lng, lat } = e.lngLat;

    // Remove existing selected marker if any
    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.remove();
    }

    // Create and add new marker at clicked position
    const newMarker = new mapboxgl.Marker({
      color: "#FF0000", // Red color for the selected marker
      draggable: true, // Make it draggable if needed
    })
      .setLngLat([lng, lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div>
              <h4>Selected Location</h4>
              <p>Lat: ${lat.toFixed(6)}</p>
              <p>Lng: ${lng.toFixed(6)}</p>
            </div>
          `)
      )
      .addTo(mapRef.current!);

    // Store the reference to the selected marker
    selectedMarkerRef.current = newMarker;

    // Optional: Add event listener for when marker is dragged
    newMarker.on("dragend", () => {
      const lngLat = newMarker.getLngLat();
      console.log("Marker dragged to:", { lng: lngLat.lng, lat: lngLat.lat });
    });
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
        // .setPopup(new mapboxgl.Popup().setHTML(`<h3>${location.label}</h3>`))
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

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [105.854444, 21.028511],
      zoom: 6, // Increased zoom to better see Vietnam
      minZoom: 1,
      // maxBounds: [
      //   [102.14441, 8.1952],
      //   [109.4642, 23.3934],
      // ],
      style: "mapbox://styles/mapbox/streets-v12",
    });

    // Store map reference
    mapRef.current = map;

    // Add navigation controls to avoid conflict with search
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-left"
    );

    map.on("click", (e) => handleMapClick(e));
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

    geocoder.on("result", handleMapboxSearch);

    return () => {
      clearAllMarkers();
      if (selectedMarkerRef.current) {
        selectedMarkerRef.current.remove();
      }
      map.remove();
    };
  }, []);

  return (
    <div
      style={{
        // height: "90vh",
        position: "relative",
      }}
    >
      <div
        className="container-map"
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%" }}
      >
        {isSelectScreen ? (
          <div className="relative h-[500px] w-[1000px]"></div>
        ) : (
          <MapFilterSidebar onSearch={handleLocalSearch} />
        )}

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
