// src/common/useSSRData.js
// Returns server-injected data for a given key.
// Reads from ApiDataContext first (works during SSR where window is undefined),
// then falls back to window.__INITIAL_DATA__ for CSR without a provider.

import { useContext } from "react";
import { ApiDataContext } from "./ApiContext";

/**
 * @param {string} key - e.g. 'speakers', 'news', 'venue', 'sponsors', etc.
 * @returns {any} The SSR-injected data for this key, or null.
 */
export function useSSRData(key) {
    // Primary: context value — populated from prop during SSR AND CSR
    const ctx = useContext(ApiDataContext);
    if (ctx?.__allData?.[key] !== undefined) {
        return ctx.__allData[key];
    }
    // Fallback: window (CSR only, when used outside ApiDataProvider)
    if (typeof window !== "undefined" && window.__INITIAL_DATA__) {
        return window.__INITIAL_DATA__[key] ?? null;
    }
    return null;
}

/**
 * Returns entire __INITIAL_DATA__ object (or null if unavailable).
 */
export function useAllSSRData() {
    const ctx = useContext(ApiDataContext);
    if (ctx?.__allData) return ctx.__allData;
    if (typeof window !== "undefined") {
        return window.__INITIAL_DATA__ ?? null;
    }
    return null;
}
