import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { PlatoService } from '../services/PlatoService';
import { Skeleton } from 'primereact/skeleton';

export const PlatoCard = ({parentOnClick}) => {

    const [plato, setPlato] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPlato, setShowPlato] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
            async function getPlato(){
                setShowPlato(false);
                setLoading(true);
    
                const platoService = new PlatoService();
                await platoService.getPlato().then( res => setPlato(res.data));
    
                setShowPlato(true);
                setLoading(false);
            }
            getPlato();
    }, [update])

    const renderFooter = () => {
        return (
            <div className='scalein animation-ease-in animation-duration-1000'>
                <Button label="Buscar otro" onClick={() => setUpdate(!update)} />
            </div>
        );
    }

    function capitalizeFirstLetter( palabra ) {
        let string = palabra || "";
        string = string.toLowerCase();
        const toReturn = string.charAt(0).toUpperCase() + string.slice(1);
        return toReturn;
    }

    const skeletonDialog = (
        <Dialog visible={loading} resizable={false} closable={false} draggable={false} header={<Skeleton width='20rem' height='2rem' className='mr-3' ></Skeleton>}
        breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '35vw'}}>
            <Skeleton className="mb-2"></Skeleton>
            <Skeleton width="10vw" className="mb-2"></Skeleton>
            <Skeleton width="5vw" className="mb-2"></Skeleton>
            <Skeleton height="2vw" className="mb-2"></Skeleton>
            <Skeleton width="10vw" height="4rem"></Skeleton>
        </Dialog>
    )

    const header = <a target={"_blank"} href={'https://www.google.com/search?q=' + plato.nombreReal}  style={{fontFamily: 'Kiwi Maru', textDecoration: 'none'} } className='text-primary font-medium text-6xl'>{plato.nombreReal}</a>

    const platoDialog = (
        <Dialog visible={showPlato} onHide={() => parentOnClick(false)} header={header} resizable={false} draggable={false} footer={renderFooter}
        breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '35vw'}} >
            <p style={{fontFamily: 'Work Sans'}} className='text-color'>Nombre en español: <span className='text-color-secondary'>{plato.nombre}</span></p>
            <p style={{fontFamily: 'Work Sans'}} className='text-color'>English name: <span className='text-color-secondary'>{plato.nombreEng}</span></p>
            <p style={{fontFamily: 'Work Sans'}} className='text-color'>Continente de origen: <span className='text-color-secondary'>{ capitalizeFirstLetter(plato.continente) }</span></p>
            <p style={{fontFamily: 'Work Sans'}} className='text-color'>Sabor principal: <span className='text-color-secondary'>{ capitalizeFirstLetter(plato.sabor) }</span></p>
            <p style={{fontFamily: 'Work Sans'}} className='text-color'>Temperatura: <span className='text-color-secondary'>{ capitalizeFirstLetter(plato.temperatura) }</span></p>
        </Dialog>
    )

    return(
            <div>
                {skeletonDialog}
                {platoDialog}
            </div>
    )
}