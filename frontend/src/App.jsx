import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import './css/index.css';
import Title from './components/Title';

export default function App() {
    const navigation = useNavigation();

    return (
        <div
            className={`min-h-[100dvh] flex flex-col items-center py-10 px-3 ${navigation.state === 'loading' ? 'loading' : ''}`}
        >
            <Title content={'Quote Repository'} />

            <div className="">
                <Outlet />
            </div>
        </div>
    );
}
