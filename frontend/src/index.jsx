import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Error from './components/Error';
import Quotes from './components/Quotes';
import QuoteContent, { loader as quoteLoader } from './components/QuoteContent';
import AddQuote, { loader as addQuoteLoader } from './components/AddQuote';
import EditQuote from './components/EditQuote';

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
                        path: 'quotes/add',
                        element: <AddQuote />,
                        loader: addQuoteLoader,
                    },
                    {
                        path: 'quotes/:quoteId/edit',
                        element: <EditQuote />,
                        loader: quoteLoader,
                    },
                    {
                        path: 'tags/add',
                    },
                    {
                        path: 'tags/edit',
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
