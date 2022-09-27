import React from 'react';
import '../../styles/App.css';
import { Navbar } from '../Navbar'
import { PlatoCard } from "../PlatoCard";

export const Home = () => {
    return (
          <div className='flex flex-column min-h-screen'>
            <Navbar inHome={true} inAdmin={false} />
            <PlatoCard />  
          </div>
    );
}