import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import MapFilterSidebar from "./MapFilterSidebar";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import SearchResult from "./SearchResult";
import "./map.css";
import { getListCompanyPublicAPI } from "@/services/apis/common";
import { Form, Spin } from "antd";

interface MapPageProps {
  isSelectScreen?: boolean; // Optional prop to determine if it's a selection screen
}

function MapPage({ isSelectScreen = false }: MapPageProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const selectedMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [form] = Form.useForm();

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  const handleLocalSearch = async (values: any, page = 0, size = 10, isLoadmore = false) => {
    const {
      data
    } = await getListCompanyPublicAPI({ ...values, page, size });

    if (data.totalElements) {
      setTotalElements(data.totalElements);
    }

    if (data?.content?.length > 0) {
      const temp = data.content.map((item: any) => ({
        ...item,
        coordinates: [Number(item.latitude), Number(item.longitude)],
      }));

      if (isLoadmore) {
        // If it's a load more action, append to existing data
        setFilteredData((prev) => [...prev, ...temp]);
      } else {
        // If it's a new search, replace existing data
        setFilteredData(temp);
      }

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
  // const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
  //   const { lng, lat } = e.lngLat;

  //   // Remove existing selected marker if any
  //   if (selectedMarkerRef.current) {
  //     selectedMarkerRef.current.remove();
  //   }

  //   // Create and add new marker at clicked position
  //   const newMarker = new mapboxgl.Marker({
  //     color: "#FF0000", // Red color for the selected marker
  //     draggable: true, // Make it draggable if needed
  //   })
  //     .setLngLat([lng, lat])
  //     .setPopup(
  //       new mapboxgl.Popup({ offset: 25 }).setHTML(`
  //           <div>
  //             <h4>Selected Location</h4>
  //             <p>Lat: ${lat.toFixed(6)}</p>
  //             <p>Lng: ${lng.toFixed(6)}</p>
  //           </div>
  //         `)
  //     )
  //     .addTo(mapRef.current!);

  //   // Store the reference to the selected marker
  //   selectedMarkerRef.current = newMarker;

  //   // Optional: Add event listener for when marker is dragged
  //   newMarker.on("dragend", () => {
  //     const lngLat = newMarker.getLngLat();
  //     console.log("Marker dragged to:", { lng: lngLat.lng, lat: lngLat.lat });
  //   });
  // };

  // Function to add multiple markers
  const addMarkersToMap = (map: mapboxgl.Map, locations: any[]) => {
    // Clear existing markers first
    clearAllMarkers();

    const newMarkers: mapboxgl.Marker[] = [];

    locations.forEach((location) => {
      const marker = new mapboxgl.Marker({ color: "#0000FF" })
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
      center: [107.5, 16.0], // More centered coordinates for Vietnam
      zoom: 5.5, // Lower zoom to see entire country
      minZoom: 1,
      maxBounds: [
        [102.14441, 8.1952], // Southwest coordinates
        [109.4642, 23.3934], // Northeast coordinates
      ],
      style: "mapbox://styles/mapbox/streets-v12",
    });

    // Store map reference
    mapRef.current = map;

    // Wait for map to load, then fit to Vietnam bounds
    map.on("load", () => {
      // Define Vietnam's geographical bounds
      const vietnamBounds = new mapboxgl.LngLatBounds(
        [102.14441, 8.1952], // Southwest corner
        [109.4642, 23.3934] // Northeast corner
      );

      // Fit the map to Vietnam's bounds with padding
      map.fitBounds(vietnamBounds, {
        padding: 50, // Add some padding around the edges
        duration: 1000, // Smooth animation duration
      });

      // Set loading to false after map is fully loaded and fitted
      setTimeout(() => {
        setIsMapLoading(false);
      }, 1100); // Slightly longer than fitBounds duration
    });

    // Optional: Handle if map fails to load
    map.on("error", () => {
      setIsMapLoading(false);
      console.error("Map failed to load");
    });

    // Add navigation controls to avoid conflict with search
    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "bottom-left"
    );

    // map.on("click", (e) => handleMapClick(e));
    // Add the geocoder
    // const geocoder = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken as string,
    //   mapboxgl: mapboxgl as any,
    //   countries: "vn",
    //   placeholder: "Tìm kiếm địa điểm...",
    //   marker: false, // Disable default marker to use custom ones
    //   flyTo: {
    //     speed: 1.2,
    //     curve: 1.42,
    //     easing: (t: any) => t,
    //   },
    // });

    // // geocoder.on("result", handleMapboxSearch);

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
      {/* Map Loading Overlay */}
      {isMapLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
            <div style={{ marginTop: 16, fontSize: 16, color: "#666" }}>
              Loading Map...
            </div>
          </div>
        </div>
      )}

      <div
        className="container-map"
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%" }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleLocalSearch}
        // className="space-y-3"
        >
          {isSelectScreen ? (
            <div className="relative h-[500px] w-[1000px]"></div>
          ) : (
            <MapFilterSidebar />
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
              totalElements={totalElements}
              loadMore={handleLocalSearch}
            />
          )}
        </Form>
      </div>
    </div>
  );
}

export default MapPage;
