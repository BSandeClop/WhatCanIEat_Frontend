import React, {useState} from 'react';
import '../../styles/App.css';
import { Navbar } from '../Navbar'
import { PlatoCard } from "../PlatoCard";
import { PlatoService } from '../../services/PlatoService';
import { Button } from 'primereact/button';

export const Home = () => {

  const [displayCard, setDisplayCard] = useState(false);

  const onClick = (bool) => {
    setDisplayCard(bool)
  }

  return (
      <div>
         <div className='flex flex-column min-h-screen'>
            <Navbar inHome={true} inAdmin={false} />
            <div className='flex flex-grow-1 justify-content-center align-items-center'>
              <Button style={{fontFamily: 'Work Sans'}} onClick={() => onClick(true)} label="Buscar plato aleatorio" icon="pi pi-search " />
            </div>
          </div>
          { displayCard && <PlatoCard parentOnClick={onClick} /> }
      </div>
    );
}