
const GOOGLE_FONTS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;

export async function getFontsList(): Promise<any[]> {
    try {
        console.log("API Key present:", GOOGLE_FONTS_API_KEY !== undefined);
        console.log("Fetching from Google Fonts API");
        
        const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`);
        
        if (!response.ok) {
            console.log("API Response not OK:", response.status);
            return [];
        }
        
        const data = await response.json();
        console.log("Fonts fetched successfully:", data.items.length);
        return data.items;
    } catch (error) {
        console.error("Error fetching fonts:", error);
        return [];
    }
}
