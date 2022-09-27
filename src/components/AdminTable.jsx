import React, { useState, useEffect } from "react"
import { DataTable } from 'primereact/datatable'
import { Column } from "primereact/column"
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';

export const AdminTable = () => {

    const [platos, setPlatos] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [platosSeleccionados, setPlatosSeleccionados] = useState(null);

    const searchArea = (
        <div className="table-header flex justify-content-between">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const editarButton = () => {
        <Button icon="pi pi-search" className="p-button-rounded p-button-success"/>
    }

    const eliminarButton = () => {
        (
            <Button icon="pi pi-times" className="p-button-rounded p-button-danger"/>
        )
    }

    const toolbarActions = () => {
        return (
                <div>                
                    <Button label="Nuevo" icon="pi pi-plus" className="p-button-outlined p-button-success mr-2" />
                    <Button label="Borrar" icon="pi pi-trash" className="p-button-outlined p-button-danger" />
                </div>            
        )
    }

    return(
        <div className="mt-5 mx-3 border-round">
            <Toolbar className="mb-4" left={toolbarActions} right={searchArea}></Toolbar>
            <DataTable value={platos} header={ <span className="text-primary">Administrar Platos</span> } selection={platosSeleccionados} scrollable strippedRows>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="nombreReal" header="Nombre Real"></Column>
                <Column field="nombreEng" header="Nombre Eng"></Column>
                <Column field="continente" header="Continente"></Column>
                <Column field="sabor" header="Sabor"></Column>
                <Column field="temperatura" header="Temperatura"></Column>
                <Column field="accion" header="Accion"></Column>
            </DataTable>
        </div>
    )
}
                 