import React, { useState } from 'react';
import { Image } from 'primereact/image';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export const PlatoCard = () => {

    const [displayBasic, setDisplayBasic] = useState(false);
    const dialogFuncMap = {
        'displayBasic': setDisplayBasic
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const renderFooter = () => {
        return (
            <div>
                <Button label="Buscar otro" autoFocus />
            </div>
        );
    }

    const title = <span className='text-primary'>Titulo super ultra largo</span>
    
    return(
        <div className='flex flex-grow-1 justify-content-center align-items-center'>

            <Button onClick={() => onClick("displayBasic")} label="Buscar plato aleatorio" icon="pi pi-search " />
            <Dialog visible={displayBasic} onHide={() => onHide("displayBasic")} header={title} resizable={false} draggable={false} footer={renderFooter()}>
                <Image src='https://via.placeholder.com/400x300'></Image>
            </Dialog>
        </div>
    )
}