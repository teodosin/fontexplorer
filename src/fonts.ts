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

export function saveCurrents(data: CurrentData) {
    localStorage.setItem(CURRENTS_KEY, JSON.stringify(data));
}

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

export function saveRelations(data: RelationsData) {
    localStorage.setItem(RELATIONS_KEY, JSON.stringify(data));
}

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
    // Todo: Periodically update fonts list

    console.log("Getting fonts list...");
    // Check if we're in browser environment before using localStorage
    if (typeof window !== 'undefined') {
        const cache = localStorage.getItem("fonts");
        if (cache && cache.length > 0) {
            console.log("Using cached fonts list");
            return JSON.parse(cache);
        }
    }

    const response = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${GOOGLE_FONTS_API_KEY}`);
    const data = await response.json();

    // Only set localStorage if we're in browser environment
    if (typeof window !== 'undefined') {
        localStorage.setItem("fonts", JSON.stringify(data.items));
    }

    return data.items;
}

export function getFontsFromLocal() {
    const fonts = localStorage.getItem("fonts");
    if (fonts) {
        return JSON.parse(fonts);
    }
    else {
        return [];
    }
}

export function importAllFonts(fontFamilies: string[]) {
    const families = fontFamilies.map(f => encodeURIComponent(f)).join('&family=')
    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css2?family=${families}&display=swap`
    link.rel = 'stylesheet'
    document.head.appendChild(link)
}