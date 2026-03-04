import { JourneyRecord, RouteMetrics, TravelMode } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function saveJourney(params: {
  userId: string;
  sourceText: string;
  destinationText: string;
  mode: TravelMode;
  routeId: string;
  metrics: RouteMetrics;
  co2SavedKg?: number;
  media?: JourneyRecord['media'];
}): Promise<string> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/journeys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
    body: JSON.stringify({
      userId: params.userId,
      sourceText: params.sourceText,
      destinationText: params.destinationText,
      mode: params.mode,
      routeId: params.routeId,
      metrics: params.metrics,
      co2SavedKg: params.co2SavedKg ?? 0,
      media: params.media ?? [],
      startedAt: Date.now(),
      completedAt: Date.now(),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save journey');
  }

  const data = await response.json();
  return data.id || data.journeyId || 'saved';
}

export async function listJourneys(userId: string): Promise<JourneyRecord[]> {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${API_URL}/journeys?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch journeys');
  }

  const data = await response.json();
  return data.journeys || [];
}
