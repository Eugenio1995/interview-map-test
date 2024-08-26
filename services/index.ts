import { Country, CountryResponse } from '@/interfaces';
import { gql, request } from 'graphql-request';

const endpoint = 'https://countries.trevorblades.com/';

const countryCoordinates = [
  { code: "US", latitude: 37.0902, longitude: -95.5022 },
  { code: "CA", latitude: 53.0000, longitude: -123.0000 },
  { code: "MX", latitude: 23.0000, longitude: -102.0000 },
  { code: "BR", latitude: -23.0000, longitude: -55.0000 },
  { code: "AR", latitude: -32.0000, longitude: -68.0000 },
  { code: "CL", latitude: -33.0000, longitude: -70.0000 },
  { code: "CO", latitude: 10.0000, longitude: -72.0000 },
  { code: "PE", latitude: -12.0000, longitude: -77.0000 },
  { code: "EC", latitude: -1.0000, longitude: -79.0000 },
  { code: "VE", latitude: 7.0000, longitude: -66.0000 },
  { code: "GY", latitude: 6.0000, longitude: -58.0000 },
  { code: "SR", latitude: 6.0000, longitude: -55.0000 },
  { code: "GF", latitude: 4.0000, longitude: -53.0000 },
];

export const getCountries = async (): Promise<CountryResponse[]> => {
  const query = gql`
    {
       countries {
        code
        name
        capital
        currency
        emoji
        phone        
  }
    }
  `;

  try {
    const data = await request<{ countries: Country[] }>(endpoint, query);

    const countries: CountryResponse[] = data.countries
      .filter(country => countryCoordinates.some(coord => coord.code === country.code))
      .map(country => {
        const coordinates = countryCoordinates.find(coord => coord.code === country.code)!;
        return {
          Country: country.name,
          ISO_Code: country.code,
          Latitude: coordinates.latitude,
          Longitude: coordinates.longitude,
          capital: country.capital,
          currency: country.currency,
          emoji: country.emoji,
          phone: country.phone,
          continent: {
            code: country.code
          }
        };
      });

    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};