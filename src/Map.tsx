import React, { useEffect, useRef } from 'react';

// --- MAP DATA ---
// Using coordinates for a route around Kollam, Kerala
const routeCoordinates: [number, number][] = [
    [8.878, 76.60], [8.880, 76.602], [8.882, 76.605], [8.885, 76.608],
    [8.888, 76.610], [8.890, 76.608], [8.892, 76.605], [8.894, 76.602],
    [8.895, 76.598], [8.893, 76.595], [8.890, 76.592], [8.887, 76.590],
    [8.884, 76.592], [8.881, 76.595], [8.878, 76.60]
];

const busStops = [
    { name: 'Kollam Bus Stand', coords: [8.885, 76.608] as [number, number] },
    { name: 'Chinnakada', coords: [8.892, 76.605] as [number, number] },
    { name: 'Railway Station Area', coords: [8.8925, 76.6020] as [number, number] }
];

const MapComponent: React.FC = () => {
    // Refs are used to hold references to the map and DOM elements
    // without causing the component to re-render. This is key to the fix.
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<any | null>(null);
    const busMarkerRef = useRef<any | null>(null);

    // This useEffect hook runs only ONCE after the component first mounts.
    useEffect(() => {
        // This function will initialize the map.
        const initializeMap = (L: any) => {
            // Check if the map container exists and if the map hasn't been initialized yet.
            if (mapContainerRef.current && !mapInstanceRef.current) {
                // Create the map and store its instance in our ref.
                const map = L.map(mapContainerRef.current).setView([8.888, 76.595], 15);
                mapInstanceRef.current = map;

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                L.polyline(routeCoordinates, { color: 'blue' }).addTo(map);

                busStops.forEach(stop => {
                    L.marker(stop.coords).addTo(map).bindPopup(`<b>${stop.name}</b>`);
                });

                const busIcon = L.divIcon({
                    html: '🚌',
                    className: 'bus-icon',
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });

                // Create the bus marker and store its instance in our ref.
                const busMarker = L.marker(routeCoordinates[0], { icon: busIcon }).addTo(map);
                busMarkerRef.current = busMarker;
            }
        };

        // This function patiently waits for the Leaflet script to be ready.
        const checkLeaflet = () => {
            const L = (window as any).L;
            if (L) {
                initializeMap(L);
            } else {
                setTimeout(checkLeaflet, 100);
            }
        };

        checkLeaflet();

        // This is the cleanup function. It runs when the component is unmounted.
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []); // The empty dependency array [] ensures this effect runs only once.

    // This useEffect handles the bus animation. It also runs only once.
    useEffect(() => {
        const interval = setInterval(() => {
            // Check if the bus marker has been created before trying to move it.
            if (busMarkerRef.current) {
                // This logic is simplified and can be part of the component's state if needed.
                const currentLatLng = busMarkerRef.current.getLatLng();
                const currentIndex = routeCoordinates.findIndex(
                    coord => coord[0] === currentLatLng.lat && coord[1] === currentLatLng.lng
                );
                const nextIndex = (currentIndex + 1) % routeCoordinates.length;
                const nextPosition = routeCoordinates[nextIndex];
                busMarkerRef.current.setLatLng(nextPosition);
            }
        }, 2000);

        return () => clearInterval(interval); // Cleanup the interval.
    }, []);

    // Render the div that will contain the map.
    return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default MapComponent;