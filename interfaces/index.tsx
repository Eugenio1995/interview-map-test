export interface Country {
    name: string;
    code: string;
    capital: string;
    currency: string;
    emoji: string;
    phone: string
}

export interface CountryResponse {
    Country: string;
    ISO_Code: string;
    Latitude: number;
    Longitude: number;
    capital: string;
    currency: string;
    emoji: string;
    phone: string
    continent: {
        code: string
    }
}