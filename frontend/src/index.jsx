import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Error from './components/Error';
import Quotes from './components/Quotes';
import QuoteContent, { loader as quoteLoader } from './components/QuoteContent';
import Form from './components/Form';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                errorElement: <Error />,
                children: [
                    {
                        index: true,
                        element: <Quotes />,
                    },
                    {
                        path: 'quotes/:quoteId',
                        element: <QuoteContent />,
                        loader: quoteLoader,
                    },
                    {
                        path: 'quotes/:quoteId/edit',
                        element: <Form />,
                    },
                ],
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
