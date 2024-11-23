import './global.css';

import React from 'react';
import {LogBox} from 'react-native';
import AppContainer from './src/AppContainer';

LogBox.ignoreAllLogs();

function App(): React.JSX.Element {
  return <AppContainer />;
}

export default App;
