const GOOGLE_FONTS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;

const CURRENTS_KEY = "teodosin-font-explorer";
const RELATIONS_KEY = "teodosin-font-explorer-relations";

// Data structure for saving current state to localstorage
export interface CurrentData {
    version: "0.0.1";
    currentFont: string;
    currentFontSize: number;
    currentPreviewText: string;
}

// Reminder: Use saveCurrents only inside hooks
export function saveCurrents(data: CurrentData) {
    localStorage.setItem(CURRENTS_KEY, JSON.stringify(data));
}

// Reminder: Use loadCurrents only inside hooks
export function loadCurrents(): CurrentData {
    const data = localStorage.getItem(CURRENTS_KEY);
    if (data) {
        return JSON.parse(data);
    }
    else {
        return  {
            version: "0.0.1",
            currentFont: "Georgia",
            currentFontSize: 16,
            currentPreviewText: "The quick brown fox jumps over the lazy dog"
        }
    }
}

// Saving relations to localstorage
export interface RelationsData {
    version: "0.0.1";
    relationTypes: string[];
    relations: Relation[];
}

// Relations are defined by a property and a value change.
// Some properties can't be exactly quantified so we can just
// say if it's more or less. 
export interface Relation {
    fromFamily: string;
    toFamily: string;
    property: string;
    valueChange: number | "more" | "less";
}

// Reminder: Use saveRelations only inside hooks
export function saveRelations(data: RelationsData) {
    localStorage.setItem(RELATIONS_KEY, JSON.stringify(data));
}

// Reminder: Use loadRelations only inside hooks
export function loadRelations(): RelationsData {
    const data = localStorage.getItem(RELATIONS_KEY);
    if (data) {
        return JSON.parse(data);
    }
    else {
        return  {
            version: "0.0.1",
            relationTypes: [],
            relations: []
        }
    }
}

export interface GoogleFont {
    family: string;
}

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

// Reminder: Use getFontsFromLocal only inside hooks
export function getFontsFromLocal() {
    const fonts = localStorage.getItem("fonts");
    if (fonts) {
        return JSON.parse(fonts);
    }
    else {
        return [];
    }
}