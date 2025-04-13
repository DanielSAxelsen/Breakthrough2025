"use client";
import { useState, useCallback, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

interface Place {
  id: string;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  description?: string;
  rating?: number;
  vicinity?: string;
  photoUrl?: string;
}

// List of place names
const PLACE_NAMES = [
  "Yivliminare Mosque",
  "Mermerli Plajı",
  "Antalya Archaeology Museum",
  "Hidirlik Tower",
  "Termessos Ruins",
  "Roman Harbour",
  "Perge Ancient City",
  "Hadrian's Gate",
  "Konyaaltı Beaches",
  "Duden Waterfalls",
];

const GoogleMapsPlaces = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Map container style
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  // Center on Johan Mantzius Vej 3
  const center = {
    lat: 55.84431,
    lng: 12.43121
  };

  const options = {
    disableDefaultUI: false,
    zoomControl: true,
  };

  // Fetch placeId using place name
  const fetchPlaceIdByName = useCallback(
    (placeName: string) => {
      if (!map) return;

      const service = new google.maps.places.PlacesService(map);
      service.findPlaceFromQuery(
        {
          query: placeName,
          fields: ["place_id"],
        },
        (results, status) => {
          if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            results &&
            results[0]?.place_id
          ) {
            fetchPlaceDetails(results[0].place_id); // Fetch full details with the placeId
          }
        }
      );
    },
    [map]
  );

  // Fetch full place details using placeId
  const fetchPlaceDetails = useCallback(
    (placeId: string) => {
      if (!map) return;

      const service = new google.maps.places.PlacesService(map);
      service.getDetails(
        {
          placeId: placeId,
          fields: [
            "name",
            "geometry",
            "formatted_address",
            "rating",
            "photos",
            "editorial_summary",
            "place_id",
          ],
        },
        (result, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && result) {
            const place: Place = {
              id: result.place_id!,
              name: result.name!,
              position: {
                lat: result.geometry?.location?.lat() || 0,
                lng: result.geometry?.location?.lng() || 0,
              },
              // @ts-expect-error editorial_summary is not in the type
              description: result.editorial_summary?.overview,
              rating: result.rating,
              vicinity: result.formatted_address,
              photoUrl: result.photos?.[0]?.getUrl({
                maxWidth: 300,
                maxHeight: 200,
              }),
            };
            setPlaces((prev) => [...prev, place]);
          }
        }
      );
    },
    [map]
  );

  // Fetch placeIds when map is ready
  useEffect(() => {
    if (map) {
      PLACE_NAMES.forEach((placeName) => {
        fetchPlaceIdByName(placeName);
      });
    }
  }, [map, fetchPlaceIdByName]);

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const getGoogleMapsUrl = (place: Place) => {
    return `https://www.google.com/maps/place/?q=place_id:${place.id}`;
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={options}
        onLoad={onLoad}
      >
        {places.map((place, index) => (
          <Marker
            key={place.name + index}
            position={place.position}
            onClick={() => setSelectedPlace(place)}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={selectedPlace.position}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div className="p-2 max-w-[300px]">
              <h3 className="font-bold text-lg mb-2">{selectedPlace.name}</h3>
              {selectedPlace.photoUrl && (
                <div className="mb-2">
                  <img
                    src={selectedPlace.photoUrl}
                    alt={selectedPlace.name}
                    className="w-full h-[150px] object-cover rounded-lg"
                  />
                </div>
              )}
              {selectedPlace.description && (
                <p className="text-sm mb-2">{selectedPlace.description}</p>
              )}
              {selectedPlace.rating && (
                <p className="text-sm mb-1">
                  Rating: {selectedPlace.rating} ⭐
                </p>
              )}
              {selectedPlace.vicinity && (
                <p className="text-sm text-gray-600 mb-2">
                  {selectedPlace.vicinity}
                </p>
              )}
              <a
                href={getGoogleMapsUrl(selectedPlace)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
              >
                View on Google Maps
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapsPlaces;

