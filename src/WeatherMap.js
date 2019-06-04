import day_clear from './set/png/day_clear.png';
import day_clouds from './set/png/day_clouds.png';
import day_fallback from './set/png/day_fallback.png';
import day_rain from './set/png/day_rain.png';
import day_sand from './set/png/day_sand.png';
import day_snow from './set/png/day_snow.png';
import day_thunderstorm from './set/png/day_thunderstorm.png';
import night_clear from './set/png/night_clear.png'
import night_clouds from './set/png/night_clouds.png'
import night_fallback from './set/png/night_fallback.png'
import night_rain from './set/png/night_rain.png'
import night_sand from './set/png/night_sand.png'
import night_snow from './set/png/night_snow.png'
import night_thunderstorm from './set/png/night_thunderstorm.png'
import drizzle from './set/png/drizzle.png'
import fog from './set/png/fog.png'
import heavy_clouds from './set/png/heavy_clouds.png'
import heavy_sand from './set/png/heavy_sand.png'
import heavy_rain from './set/png/heavy_rain.png'
import heavy_snow from './set/png/heavy_snow.png'

export default class WeatherMap {
    codeMap =  function() {return {
        200: 'thunderstrom',
        300: 'drizzle',
        500: 'rain',
        511: 'heavy_rain',
        600: 'snow',
        602: 'heavy_snow',
        622: 'heavy_snow',
        731: 'heavy_sand',
        741: 'fog',
        751: 'sand',
        800: 'clear',
        801: 'clouds',
        803: 'heavy_clouds',
        fall: 'fallback'
    }}

    imageMap = function() {return {
        day_clear, day_clouds, day_fallback, day_rain, day_sand, day_snow, day_thunderstorm,
        night_clear, night_clouds, night_fallback, night_rain, night_sand, night_snow, night_thunderstorm,
        drizzle, fog, heavy_clouds, heavy_rain, heavy_sand, heavy_snow
    }}

    getPng(code, context= 'day') {
        const convCode = this.codify(code);
        return this.imageMap()[this.addable(this.codeMap()[convCode], context)];
    }

    codify(code = 200) {
        if (code >= 200 && code < 300) {
            return '200';
        } else if (code >=300 && code < 500) {
            return '300';
        } else if (code >= 500 && code < 511) {
            return '500';
        } else if (code >= 511 && code < 600) {
            return '511';
        } else if (code >= 600 && code !== 602 && code !== 622 && code < 700) {
            return '600';
        } else if ([602, 622, 731, 741, 751, 800, 803].includes(code)) {
            return code.toString();
        } else if (code > 800 && code <900) {
            return '801';
        } else {
            return 'fall';
        }
    }

    addable(climate, context) {
        if(['drizzle', 'fog', 'heavy_clouds', 'heavy_rain', 'heavy_sand', 'heavy_snow'].includes(climate)) {
            return climate
        }
        return `${context}_${climate}`;
    }



}