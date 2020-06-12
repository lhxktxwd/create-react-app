import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from 'app/store';

const render = () => {
    const App = require('./app/App').default;
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <App />
            </HashRouter>
        </Provider>,
        document.getElementById('root'),
    );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./app/App', render);
}
