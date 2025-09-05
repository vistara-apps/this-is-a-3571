import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Mock reverse geocoding for demo - in production, use a real service
          const state = await reverseGeocode(latitude, longitude);
          
          setLocation({
            latitude,
            longitude,
            state: state || 'CA' // Default to CA for demo
          });
        } catch (err) {
          setError('Failed to determine location');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError(getLocationErrorMessage(error));
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 600000
      }
    );
  };

  // Mock reverse geocoding function
  const reverseGeocode = async (lat, lng) => {
    // In a real app, you'd use a service like Google Maps API
    // For demo purposes, return a state based on rough coordinates
    if (lat >= 32.5 && lat <= 42 && lng >= -124.4 && lng <= -114.1) return 'CA';
    if (lat >= 40.4 && lat <= 45.0 && lng >= -79.8 && lng <= -71.8) return 'NY'; 
    if (lat >= 25.8 && lat <= 36.5 && lng >= -106.6 && lng <= -93.5) return 'TX';
    return 'CA'; // Default
  };

  const getLocationErrorMessage = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Location access denied by user';
      case error.POSITION_UNAVAILABLE:
        return 'Location information unavailable';
      case error.TIMEOUT:
        return 'Location request timed out';
      default:
        return 'An unknown error occurred while retrieving location';
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return {
    location,
    loading,
    error,
    refetch: getCurrentLocation
  };
};