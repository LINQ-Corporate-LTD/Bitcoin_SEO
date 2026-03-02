// src/common/useSSRData.js
// Returns server-injected data for a given key from window.__INITIAL_DATA__
// Falls back to null if not available (e.g. during pure CSR).
// This is the ONLY place components should read page-level SSR data from.

/**
 * @param {string} key - e.g. 'speakers', 'news', 'venue', 'sponsors', etc.
 * @returns {any} The SSR-injected data for this key, or null.
 */
export function useSSRData(key) {
    if (typeof window !== "undefined" && window.__INITIAL_DATA__) {
        return window.__INITIAL_DATA__[key] ?? null;
    }
    return null;
}

/**
 * Returns entire __INITIAL_DATA__ object (or null on server-side/no data).
 */
export function useAllSSRData() {
    if (typeof window !== "undefined") {
        return window.__INITIAL_DATA__ ?? null;
    }
    return null;
}
