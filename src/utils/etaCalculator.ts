// src/utils/etaCalculator.ts

/**
 * Calculates the distance between two GPS coordinates in kilometers using the Haversine formula.
 */
function haversine(coord1: [number, number], coord2: [number, number]): number {
  const R = 6371; // Earth's radius in km
  const toRad = (deg: number) => deg * Math.PI / 180;
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
}

/**
 * Calculates the Estimated Time of Arrival in minutes.
 * @param path The array of [lat, lng] coordinates for the entire route.
 * @param currentIndex The current index of the bus on the path.
 * @param speedKmph The assumed average speed of the bus in km/h.
 * @returns A string representing the ETA (e.g., "15 min").
 */
export function calculateETA(path: [number, number][], currentIndex: number, speedKmph: number): string {
  if (!path || path.length <= currentIndex) return "N/A";

  // Calculate the total remaining distance from the current point to the end
  let remainingDistance = 0;
  for (let i = currentIndex; i < path.length - 1; i++) {
    remainingDistance += haversine(path[i], path[i + 1]);
  }

  // Calculate time in hours (time = distance / speed)
  const hours = remainingDistance / speedKmph;
  const minutes = Math.round(hours * 60);

  if (minutes < 1) return "Arriving now";
  return `${minutes} min`;
}