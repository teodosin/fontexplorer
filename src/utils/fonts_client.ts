'use client'

import { isClient } from "./utils";

const GOOGLE_FONTS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY;

const CURRENTS_KEY = "teodosin-font-explorer";
export const RELATIONS_KEY = "teodosin-font-explorer-relations";

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
            currentPreviewText: "Quick Brown Fox"
        }
    }
    const data = localStorage.getItem(CURRENTS_KEY);
    if (data) {
        return JSON.parse(data);
    }
    else {
        return {
            version: "0.0.1",
            currentFont: "Georgia",
            currentFontSize: 28,
            currentPreviewText: "Quick Brown Fox"
        }
    }
}

// Saving relations to localstorage
export interface RelationsData {
    version: "0.0.1";
    fromFamily: string;
    relations: Map<string, Relation>;
}

export interface Relation {
    fromFamily: string; // Redundant maybe?
    toFamily: string;
    comparison: string;
}

// Reminder: Use saveRelations only inside hooks
export function saveRelations(data: RelationsData) {
    if (!isClient()) return;

    let key = RELATIONS_KEY + "_" + data.fromFamily;

    localStorage.setItem(key, JSON.stringify(data));
}

// Reminder: Use loadRelations only inside hooks
export function loadRelations(family: string): RelationsData {
    if (!isClient()) {
        return {
            version: "0.0.1",
            fromFamily: "Georgia",
            relations: new Map()
        }
    }

    let key = RELATIONS_KEY + "_" + family;

    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
    else {
        return {
            version: "0.0.1",
            fromFamily: "Georgia",
            relations: new Map()
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