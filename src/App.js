import React from 'react';
import './App.css';
import {TimelyProvider, isNight, timelyTrigger} from './Timely';
import Weather from './Weather';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      context: isNight() ? 'night' : 'day',
    };
    this.triggerChange = this.triggerChange.bind(this);
  }

  componentWillMount() {
    const time = timelyTrigger();
    setTimeout(function(){this.triggerChange()}, time);
  }

  triggerChange() {
    const currentContext = this.state.context;
    const context = currentContext === 'day' ? 'night' : 'day';
    this.setState({context: context});
  }

  render() {
    const {context} = this.state;
    return (
      <div className="App">
        <TimelyProvider value={context}>
          <Weather />
        </TimelyProvider>
      </div>
    )
  }
}
