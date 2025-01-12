const GOOGLE_FONTS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;

// Web safe fonts are not included in the Google Fonts API,
// but still available in browsers. We add them manually. 
// https://www.w3schools.com/cssref/css_websafe_fonts.php
export let webSafeFonts = [
    {family: "Arial"},
    {family: "Courier New"},
    {family: "Georgia"},
    {family: "Garamond"},
    {family: "Tahoma"},
    {family: "Times New Roman"},
    {family: "Trebuchet MS"},
    {family: "Verdana"},
    {family: "Brush Script MT"},
]

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

        let addedWebSafe = [...data.items, ...webSafeFonts];
        return addedWebSafe;
    } catch (error) {
        console.error("Error fetching fonts:", error);
        return [];
    }
}
