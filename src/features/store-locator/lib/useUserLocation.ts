'use client';

import { useState, useEffect, useCallback } from 'react';

export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  accuracy: number | null;
  loading: boolean;
  error: string | null;
  permissionState: 'prompt' | 'granted' | 'denied' | 'unavailable';
}

export interface UseUserLocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export function useUserLocation(options: UseUserLocationOptions = {}) {
  const [state, setState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    loading: false,
    error: null,
    permissionState: 'prompt',
  });

  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 300000, // 5 minutes
  } = options;

  // Check if geolocation is available
  const isGeolocationAvailable = typeof window !== 'undefined' && 'geolocation' in navigator;

  // Check permission state
  const checkPermission = useCallback(async () => {
    if (!isGeolocationAvailable) {
      setState((prev) => ({
        ...prev,
        permissionState: 'unavailable',
        error: 'خدمة تحديد الموقع غير متوفرة في متصفحك',
      }));
      return;
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      setState((prev) => ({
        ...prev,
        permissionState: permission.state as LocationState['permissionState'],
      }));

      // Listen for permission changes
      permission.addEventListener('change', () => {
        setState((prev) => ({
          ...prev,
          permissionState: permission.state as LocationState['permissionState'],
        }));
      });
    } catch {
      // Some browsers don't support permissions API
      setState((prev) => ({ ...prev, permissionState: 'prompt' }));
    }
  }, [isGeolocationAvailable]);

  // Request location
  const requestLocation = useCallback(() => {
    if (!isGeolocationAvailable) {
      setState((prev) => ({
        ...prev,
        error: 'خدمة تحديد الموقع غير متوفرة في متصفحك',
        loading: false,
      }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          loading: false,
          error: null,
          permissionState: 'granted',
        });
      },
      (error) => {
        let errorMessage = 'حدث خطأ أثناء تحديد موقعك';
        let permissionState: LocationState['permissionState'] = 'prompt';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'تم رفض الإذن للوصول إلى موقعك';
            permissionState = 'denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'معلومات الموقع غير متوفرة حالياً';
            break;
          case error.TIMEOUT:
            errorMessage = 'انتهت مهلة طلب الموقع';
            break;
        }

        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorMessage,
          permissionState,
        }));
      },
      {
        enableHighAccuracy,
        timeout,
        maximumAge,
      }
    );
  }, [isGeolocationAvailable, enableHighAccuracy, timeout, maximumAge]);

  // Clear location
  const clearLocation = useCallback(() => {
    setState({
      latitude: null,
      longitude: null,
      accuracy: null,
      loading: false,
      error: null,
      permissionState: 'prompt',
    });
  }, []);

  // Check permission on mount
  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    ...state,
    isGeolocationAvailable,
    requestLocation,
    clearLocation,
    hasLocation: state.latitude !== null && state.longitude !== null,
  };
}
