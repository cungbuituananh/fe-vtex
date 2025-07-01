// components/MapClickable.tsx
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface MapClickableProps {
  visible: boolean;
}

const MapClickable = ({ visible }: MapClickableProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!visible || !mapContainerRef.current) return;

    // Clean up existing map if it exists
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Delay initialization to wait for modal animation
    const timeout = setTimeout(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current!,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [105.8544441, 21.028511],
        zoom: 13,
      });

      mapRef.current = map;

      map.on("load", () => {
        map.resize();

        // Add source for marker
        map.addSource("marker-point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        // Add layer for marker
        map.addLayer({
          id: "marker-layer",
          type: "circle",
          source: "marker-point",
          paint: {
            "circle-radius": 8,
            "circle-color": "#FF0000",
            "circle-stroke-width": 2,
            "circle-stroke-color": "#FFFFFF",
          },
        });
      });

      map.on("click", (e) => {
        const { lng, lat } = e.lngLat;

        // Update the marker source
        const source = map.getSource("marker-point") as mapboxgl.GeoJSONSource;
        if (source) {
          source.setData({
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [lng, lat],
                },
                properties: {},
              },
            ],
          });
        }
      });
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);

  // Clean up when component unmounts or becomes invisible
  useEffect(() => {
    if (!visible && mapRef.current) {
      // Clear the marker data
      const source = mapRef.current.getSource(
        "marker-point"
      ) as mapboxgl.GeoJSONSource;
      if (source) {
        source.setData({
          type: "FeatureCollection",
          features: [],
        });
      }
    }
  }, [visible]);

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="w-full h-[400px] rounded-lg" />;
};

export default MapClickable;
