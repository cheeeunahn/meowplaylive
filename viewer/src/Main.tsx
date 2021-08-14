import React from 'react';
import { render } from 'react-dom';

import { App } from './component/App';
import { socket } from 'common/Connection';

 
socket.on('connect', () =>{
    console.log("hey, I am: " + socket.id)
});

const RootElement = document.querySelector('.root');
render(<App />, RootElement);
