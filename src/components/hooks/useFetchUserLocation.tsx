import { useQuery } from '@tanstack/react-query'
import { LocationData } from '@/app/api/types'

const fetchLocation = async (lat: number, lon: number) => {
  try {
    const response = await fetch(`/api/${lat}/${lon}/location`)
    const data: LocationData = await response.json()

    return data
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

export const useFetchUserLocation = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ['user-location'],
    queryFn: () => fetchLocation(lat, lon)
  })
}
