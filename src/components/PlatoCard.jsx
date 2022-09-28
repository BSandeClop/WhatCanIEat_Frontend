import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { PlatoService } from '../services/PlatoService';
import { Skeleton } from 'primereact/skeleton';

export const PlatoCard = ({parentOnClick}) => {

    const [plato, setPlato] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function getPlato(){
            setLoading(true);

            const platoService = new PlatoService();
            await platoService.getPlato().then( res => setPlato(res.data));

            setLoading(false);
        }

        getPlato();
    }, [])

    const renderFooter = () => {
        return (
            <div>
                <Button label="Buscar otro" autoFocus />
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

    const platoDialog = (
        <Dialog visible={!loading} onHide={() => parentOnClick(false)} header={plato.nombreReal} resizable={false} draggable={false} footer={renderFooter}
        breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '35vw'}} >
            <h4>Nombre en español: {plato.nombre} </h4>
            <h4>English name: {plato.nombreEng} </h4>
            <h4>Continente de origen: { capitalizeFirstLetter(plato.continente) } </h4>
            <h4>Sabor principal: { capitalizeFirstLetter(plato.sabor) } </h4>
            <h4>Temperatura: { capitalizeFirstLetter(plato.temperatura) } </h4>
        </Dialog>
    )

    return(
            <div>
                {loading? skeletonDialog : platoDialog}
            </div>
    )
}