import { getDistance } from 'geolib';
import type { Store, StoreWithDistance } from '@/entities/store/model';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Calculate distance between two coordinates in kilometers
 */
export function calculateDistanceKm(
  from: Coordinates,
  to: Coordinates
): number {
  const distanceInMeters = getDistance(
    { latitude: from.latitude, longitude: from.longitude },
    { latitude: to.latitude, longitude: to.longitude }
  );
  
  return distanceInMeters / 1000; // Convert to kilometers
}

/**
 * Sort stores by distance from user location
 */
export function sortStoresByDistance(
  stores: Store[],
  userLocation: Coordinates
): StoreWithDistance[] {
  return stores
    .map((store) => ({
      ...store,
      distance: calculateDistanceKm(userLocation, {
        latitude: store.latitude,
        longitude: store.longitude,
      }),
    }))
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
}

/**
 * Format distance for display
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    // Show in meters if less than 1 km
    const meters = Math.round(distanceKm * 1000);
    return `${meters} متر`;
  }
  
  // Show in kilometers with 1 decimal place
  return `${distanceKm.toFixed(1)} كم`;
}

/**
 * Get nearby stores within a certain radius
 */
export function getNearbyStores(
  stores: Store[],
  userLocation: Coordinates,
  radiusKm: number = 10
): StoreWithDistance[] {
  const storesWithDistance = sortStoresByDistance(stores, userLocation);
  return storesWithDistance.filter((store) => (store.distance || 0) <= radiusKm);
}
