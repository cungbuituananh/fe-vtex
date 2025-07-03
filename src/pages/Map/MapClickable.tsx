// components/MapClickable.tsx
import { Form } from "antd";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface MapClickableProps {
  visible: boolean;
  onChangeLocation?: (location: [number, number]) => void;
}

const MapClickable = ({ visible }: MapClickableProps) => {
  const form = Form.useFormInstance();
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
        const location: [number, number] = [lng, lat];

        // Update local state
        form.setFieldsValue({ location });

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
                  coordinates: location,
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

  return (
    <>
      <div ref={mapContainerRef} className="w-full h-[400px] rounded-lg" />
    </>
  );
};

export default MapClickable;
