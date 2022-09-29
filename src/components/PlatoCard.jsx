import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { PlatoService } from '../services/PlatoService';
import { Skeleton } from 'primereact/skeleton';

export const PlatoCard = ({parentOnClick}) => {

    const [plato, setPlato] = useState({});
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
            async function getPlato(){
                setLoading(true);
                const platoService = new PlatoService();
                await platoService.getPlato().then( res => setPlato(res.data));
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


    const row = (content, prop) => (
        <p style={{fontFamily: 'Work Sans'}} className='text-color'>{content}<span className='text-color-secondary'>{capitalizeFirstLetter(plato[prop])}</span></p>
    );

    const skeletonRow = (
        <Skeleton width="15vw" className="mb-2"></Skeleton> 
    );

    const header =  <a target={"_blank"} href={'https://www.google.com/search?q=' + plato.nombreReal}  style={{fontFamily: 'Kiwi Maru', textDecoration: 'none'} } className='text-primary font-medium text-6xl'>{plato.nombreReal}</a>
    const skeletonHeader = <Skeleton width='20rem' height='2rem' className='mr-3 mb-4' ></Skeleton>
    
    const platoDialog = (
        <Dialog visible={true} onHide={() => parentOnClick(false)} header={loading ? skeletonHeader : header} resizable={false} draggable={false} footer={renderFooter}
        breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '35vw'}} >
            {loading? skeletonRow : row('Nombre en español: ','nombre')}
            {loading? skeletonRow : row('English name: ','nombreEng')}
            {loading? skeletonRow : row('Continente de origen: ','continente')}
            {loading? skeletonRow : row('Sabor principal: ', 'sabor')}
            {loading? skeletonRow : row('Temperatura de consumo: ','temperatura')}
        </Dialog>
    )

    return(
            <div>
                {platoDialog}
            </div>
    )
}