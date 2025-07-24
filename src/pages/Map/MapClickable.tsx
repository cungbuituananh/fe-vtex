// components/MapClickable.tsx
import { Form } from "antd";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface MapClickableProps {
  visible: boolean;
  onChangeLocation?: (location: [number, number]) => void;
  name: string; // Required name prop for form field
  index?: number; // Optional index prop for handling multiple locations
}

const MapClickable = ({ visible, name, index }: MapClickableProps) => {
  const form = Form.useFormInstance();
  // const location = form.getFieldValue(name);
  const isBranch = name.includes("companyBranchDtoList");

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // Get the correct location based on the data structure
  const getLocation = () => {
    if (index !== undefined && index >= 0) {
      // For array case (companyDtoList)
      const currentList =
        form.getFieldValue(isBranch ? "companyBranchDtoList" : name) || [];
      return currentList[index]?.location;
    } else {
      // For simple location case
      return form.getFieldValue(name);
    }
  };

  const _location = getLocation();

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
        center: _location || [105.854444, 21.028511], // Default to Vietnam if no location
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

        // If location exists, show marker and center map
        if (_location && Array.isArray(_location) && _location.length === 2) {
          const source = map.getSource(
            "marker-point"
          ) as mapboxgl.GeoJSONSource;
          source.setData({
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: _location as [number, number],
                },
                properties: {},
              },
            ],
          });
          map.setCenter(_location as [number, number]);
        }
      });

      map.on("click", (e) => {
        const { lng, lat } = e.lngLat;
        const location: [number, number] = [lng, lat];

        // Update local state
        if (index !== undefined && index >= 0) {
          const currentList =
            form.getFieldValue(isBranch ? "companyBranchDtoList" : name) || [];
          const newList = [...currentList];
          newList[index] = { ...newList[index], location };
          form.setFieldsValue({ companyBranchDtoList: newList });
        } else {
          form.setFieldsValue({ location: location });
        }

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
  }, [visible, name, form]);

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
    <div ref={mapContainerRef} className="w-full min-h-[400px] rounded-lg" />
  );
};

export default MapClickable;
