
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

