import React, { Component } from 'react';
import {TimelyContext} from './Timely';
import styled, {keyframes} from 'styled-components';
import Request from './lib/request';
import WeatherMap from './WeatherMap';

const map = new WeatherMap();

const open = keyframes`
    from {
        padding: 0 30px;
        height: 0;
    }
    to {
        height: 470px;
    }
`;



const up = keyframes`
0% {
    opacity: 0;
        transform: translateY(15px);
    }
    50% {
        opacity: 0;
        transform: translateY(15px);
    }
    99% {
        animation-play-state: paused;
    }
    100% {
        opacity: 1;
    }
    `;
    
const WeatherImage = styled.img`
    position: relative;
    margin-top: 20px;
    width: 125px;
    height: 125px;
    border-radius: 50%;
    animation: ${up} 2s cubic-bezier(.39, 0, .38, 1) .2s;
`;
const Temperature = styled.h1`
    float: right;
    color: ${props => props.context==='day' ? "#666" : "#999"};;
    font-weight: 300;
    font-size: 4.5rem;
    line-height: .2em;
    animation: ${up} 2s cubic-bezier(.39, 0, .38, 1) .2s;
`;

const City = styled.h2`
    font-weight: 300;
    font-size: 2.25em;
    color: ${props => props.context==='day' ? "black" : "white"}
    animation: ${up} 2s cubic-bezier(.39, 0, .38, 1);
`;

const Dot = styled.span`
    font-size: 0.9em;
`;

const Ispan = styled.span`
    margin-left: 14px;
    color: ${props => props.context==='day' ? "#999" : "#ccc"};
    font-weight: 300;
`; 

const Report = styled.h3`
    float: left;
    margin-right: 33px;
    color: ${props => props.context==='day' ? "#777" : "#aaa"};
    font-weight: 400;
    font-size: 1em;
    animation: ${up} 2s cubic-bezier(.39, 0, .38, 1) .1s;
`;


const Card = styled.div`
    margin: 0 auto;
    margin-top: 5%;
    padding: 5px 30px;
    width: 290px;
    height: 470px;
    border-radius: 3px;
    background-color: ${props => props.context==='day' ? "#fff" : "#37474F"};
    box-shadow: 1px 2px 10px rgba(0, 0, 0, .2);
    animation: ${open} 2s cubic-bezier(.39, 0, .38, 1);
`;

const TableRow = styled.tr`
    font-size: auto;    
`;
const TableCell = styled.td`
    font-size: auto;
`;

const TableData = styled.table`
    position: relative;
    top: 10px;
    width: 100%;
    color: ${props => props.context==='day' ? "#777" : "#aaa"};
    text-align: center;
    & ${TableRow}:nth-child(1) ${TableCell}:nth-child(1),
    ${TableRow}:nth-child(1) ${TableCell}:nth-child(2),
    ${TableRow}:nth-child(1) ${TableCell}:nth-child(3),
    ${TableRow}:nth-child(1) ${TableCell}:nth-child(4),
    ${TableRow}:nth-child(1) ${TableCell}:nth-child(5) {
        padding-bottom: 32px;
        animation: ${up} 2s cubic-bezier(.39, 0, .38, 1) .7s;
    }
    & ${TableRow}:nth-child(2) ${TableCell}:nth-child(1),
    ${TableRow}:nth-child(2) ${TableCell}:nth-child(2),
    ${TableRow}:nth-child(2) ${TableCell}:nth-child(3),
    ${TableRow}:nth-child(2) ${TableCell}:nth-child(4),
    ${TableRow}:nth-child(2) ${TableCell}:nth-child(5) {
        padding-bottom: 7px;
        animation: ${up} 2s cubic-bezier(.39, 0, .38, 1) .9s;
        font-size: .9em;
    }
    & ${TableRow}:nth-child(3) ${TableCell}:nth-child(1),
    ${TableRow}:nth-child(3) ${TableCell}:nth-child(2),
    ${TableRow}:nth-child(3) ${TableCell}:nth-child(3),
    ${TableRow}:nth-child(3) ${TableCell}:nth-child(4),
    ${TableRow}:nth-child(3) ${TableCell}:nth-child(5) {
        padding-bottom: 7px;
        animation: ${up} 2s cubic-bezier(.39, 0, .38, 1) .9s;
        font-size: .9em;
    }
`;

class Weather extends Component {
    req = new Request();
    // hyderabad: 1269843
    constructor(props) {
        super(props);
        this.state = {
            cityId: 1258932,
            weather: {},
            name: 'Hyderabad',
            main: {},
            sys: {},
            wind: {},
        }
    }
    componentWillMount() {
        this.getWeather();
    }

    getWeather() {
        const uri = `${process.env.REACT_APP_API_URL}?id=${this.state.cityId}&appid=${process.env.REACT_APP_API_KEY}`;
        console.log(uri);
        this.req.make(uri).then(
            (res) => {
                const {name, main, weather, sys, wind} = JSON.parse(res);
                this.setState({name, main, weather, sys, wind})
            }, (rej) => {
                console.log(rej);
            }
        )
    }
    render() {
        const cont = this.context;
        const CityName = this.state.name;
        const weat = (this.state.weather[0]||[{}]);
        const Summary = weat.main || '--';
        // const Desc = weat.description || '--';
        const Wind = this.state.wind.speed || 0;
        const humid = this.state.main.humidity || 0;
        const Temp = Math.round((this.state.main.temp || 273.15) - 273.15);
        const max = Math.round((this.state.main.temp_max || 273.15) - 273.15);
        const min = Math.round((this.state.main.temp_min || 273.15) - 273.15);
        const rise = new Date(this.state.sys.sunrise || 1).getHours();
        const set = new Date(this.state.sys.sunrise || 1).getHours();
        const png = map.getPng(weat.id || 200, cont);
        return (
            <div>
                <Card context={cont}>
                    <City context={cont}>{CityName}</City>
                    <Report context={cont}>
                        {Summary}
                        <Ispan context={cont}>Wind {Wind}m/sec <Dot>•</Dot>{humid}% humid</Ispan>
                    </Report>
                    <Temperature context={cont}>{Temp}°</Temperature>
                    <WeatherImage src={png}/>
                    <TableData context={cont}>
                        <tbody>
                            <TableRow>
                                <TableCell>Max</TableCell>
                                <TableCell>Min</TableCell>
                                <TableCell>Rise</TableCell>
                                <TableCell>Set</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>{max}°</TableCell>
                                <TableCell>{min}°</TableCell>
                                <TableCell>{rise} AM</TableCell>
                                <TableCell>{set} PM</TableCell>

                            </TableRow>
                        </tbody>
                    </TableData>
                </Card>
            </div>
        )
    }
}

Weather.contextType = TimelyContext
export default Weather;