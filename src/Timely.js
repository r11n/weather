import {createContext} from 'react';
export const TimelyContext = createContext();
export const TimelyProvider = TimelyContext.Provider;
export const Timely = TimelyContext.Consumer;
export function isNight() {
    const now = new Date();
    const hours = now.getHours();
    return (hours >= 18 || hours < 6) ;
}
export function timelyTrigger() {
    const now = new Date()
    const nTime = new Date();
    nTime.setMinutes(0, 0, 0);
    console.log(now)
    const nightTime = new Date(nTime.setHours(18));
    console.log(nightTime)
    const dayTime = new Date(nTime.setHours(6));
    const diff = nightTime - now;
    const mdiff = dayTime - now;
    if (diff > 0 && now.getHours() >= 6) {
        return diff;
    } else if (mdiff > 0) {
        return mdiff;
    } else {
        return false;
    }
}