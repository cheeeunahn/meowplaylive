import React from 'react';
import { render } from 'react-dom';

import { App } from './component/App';

const RootElement = document.querySelector('.root');
render(<App />, RootElement);
