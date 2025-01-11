'use client'

import { isClient } from "./utils";

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
    if (!isClient()) {
        return;
    }
    localStorage.setItem(CURRENTS_KEY, JSON.stringify(data));
}

// Reminder: Use loadCurrents only inside hooks
export function loadCurrents(): CurrentData {
    if (!isClient()) {
        return {
            version: "0.0.1",
            currentFont: "Georgia",
            currentFontSize: 28,
            currentPreviewText: "The quick brown fox jumps over the lazy dog"
        }
    }
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

export interface Relation {
    fromFamily: string;
    toFamily: string;
    comparison: string;
}

// Reminder: Use saveRelations only inside hooks
export function saveRelations(data: RelationsData) {
    if (!isClient()) return;

    localStorage.setItem(RELATIONS_KEY, JSON.stringify(data));
}

// Reminder: Use loadRelations only inside hooks
export function loadRelations(): RelationsData {
    if (!isClient()) {
        return {
            version: "0.0.1",
            relationTypes: [],
            relations: []
        }
    }
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

// Reminder: Use getFontsFromLocal only inside hooks
export function getFontsFromLocal() {
    if (!isClient()) {
        return [];
    }
    const fonts = localStorage.getItem("fonts");
    if (fonts) {
        return JSON.parse(fonts);
    }
    else {
        return [];
    }
}