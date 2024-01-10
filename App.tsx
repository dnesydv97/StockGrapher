import React from 'react';
import {ThemeProvider} from 'styled-components';
import {Theme} from './src/utils';
import Routes from './src/routes';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {StatusBar} from 'react-native';
import { colors } from './src/utils/theme';

const theme = Theme.createTheme();

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.greyWhite} />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
