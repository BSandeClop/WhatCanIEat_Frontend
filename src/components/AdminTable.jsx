import React, { useState, useEffect } from "react"
import { DataTable } from 'primereact/datatable'
import { Column } from "primereact/column"
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import  { PlatoService }  from "../services/PlatoService";
import { Dialog } from 'primereact/dialog';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { RadioButton } from 'primereact/radiobutton';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useRef } from "react";

export const AdminTable = () => {

    const toast = useRef(null);
    const [platos, setPlatos] = useState([]);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [showNewPlatoDialog, setShowNewPlatoDialog] = useState(false);
    const [showDeletePlatoDialog, setShowDeletePlatoDialog] = useState(false);
    const [displayLoading, setDisplayLoading] = useState(false);
    const [continentes, setContinentes] = useState([]);
    const [sabores, setSabores] = useState([]);

    useEffect(() => {
        const platoService = new PlatoService();
        platoService.getAllPlatos().then( res => setPlatos(res.data));
        setContinentes(["AFRICA","AMERICA","ASIA","EUROPA","OCEANIA"]);
        setSabores(["DULCE","SALADO","AMARGO","UMAMI","ACIDO"]);
    }, [platos])

    const searchArea = (
        <div className="table-header flex justify-content-between">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const onSubmit = async (data) => { 
        try {
            setDisplayLoading(true);
            const platoService = new PlatoService();
            const response = await platoService.addPlato(data.nombre, data.nombreReal, data.nombreEng, data.continente, data.sabor, data.temperatura);
            if (response.status === 200) {
                hideDialog();
                toast.current.show({severity:'success', summary: 'Plato añadido', closable: false, life: 3000});
            }
        } catch (error) {
            if (error.response?.status === 403) {
                toast.current.show({severity:'error', summary: 'Debes autenticarte para hacer eso', closable: false, life: 3000});
            } else {
                toast.current.show({severity:'error', summary: 'Error inesperado', detail: 'Ha ocurrido un error interno en el servidor', closable: false, life: 3000});
            }
        } finally {
            setDisplayLoading(false);
        }
        reset();
    }

    const deletePlato = async () => {
        try {
            setDisplayLoading(true);
            const platoService = new PlatoService();
            const response = await platoService.removePlato(platoSeleccionado.id);

            if (response.status === 200) {
                setShowDeletePlatoDialog(false);
                toast.current.show({severity:'success', summary: 'Plato eliminado', closable: false, life: 3000});
            }
        } catch (error) {
            if (error.response?.status === 403) {
                toast.current.show({severity:'error', summary: 'Debes autenticarte para hacer eso', closable: false, life: 3000});
            } else {
                toast.current.show({severity:'error', summary: 'Error inesperado', detail: 'Ha ocurrido un error interno en el servidor', closable: false, life: 3000});
            }
        } finally {
            setDisplayLoading(false);
        }
    }

    const editarButton = () => {
        <Button icon="pi pi-search" className="p-button-rounded p-button-success"/>
    }

    const mostrarNuevoCard = () => {
        setSubmitted(false);
        setShowNewPlatoDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setShowNewPlatoDialog(false);
        reset();
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({});

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    const toolbarActions = () => {
        return (
                <div>                
                    <Button label="Nuevo" onClick={mostrarNuevoCard} icon="pi pi-plus" className="p-button-outlined p-button-success mr-2" />
                    <Button label="Borrar" onClick={() => setShowDeletePlatoDialog(true) } icon="pi pi-trash" className="p-button-outlined p-button-danger" disabled={!platoSeleccionado} />
                </div>            
        )
    }

    const deleteDialogFooter =  (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={() => setShowDeletePlatoDialog(false)} />
            <Button label="Si" icon="pi pi-check" className="p-button-text" onClick={() => deletePlato()} />
        </React.Fragment>
    )

    return(
        <div>
            <Toast ref={toast} />
            <Dialog visible={showNewPlatoDialog} style={{ width: '450px' }} modal={false} header="Nuevo Plato" className="p-fluid" onHide={() => {hideDialog()}} >
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                    <div className="field">
                        <span className="p-float-label">
                            <Controller name="nombre" control={control} rules={{ required: 'Se requiere un nombre' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="nombre" className={classNames({ 'p-error': errors.nombre })}>Nombre en español</label>
                        </span>
                        {getFormErrorMessage('nombre')}
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Controller name="nombreReal" control={control} rules={{ required: 'Se requiere un nombre' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="nombreReal" className={classNames({ 'p-error': errors.nombre })}>Nombre Real</label>
                        </span>
                        {getFormErrorMessage('nombreReal')}
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Controller name="nombreEng" control={control} rules={{ required: 'Se requiere un nombre' }} render={({ field, fieldState }) => (
                                <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                            )} />
                            <label htmlFor="nombreEng" className={classNames({ 'p-error': errors.nombre })}>English name</label>
                        </span>
                        {getFormErrorMessage('nombreEng')}
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Controller name="continente" control={control} render={({ field }) => (
                                <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={continentes} />
                            )} />
                            <label htmlFor="continente">Continente</label>
                        </span>
                    </div>
                    <div className="field">
                        <span className="p-float-label">
                            <Controller name="sabor" control={control} render={({ field }) => (
                                <Dropdown id={field.name} value={field.value} onChange={(e) => field.onChange(e.value)} options={sabores}  />
                            )} />
                            <label htmlFor="sabor">Sabor</label>
                        </span>
                    </div>
                    <div className="field">
                        <Controller name="temperatura" control={control} render={({ field }) => (
                            <div className="flex justify-content-around">
                                <div className="field-radiobutton">
                                    <RadioButton id={field.name} value="FRIO" onChange={(e) => field.onChange(e.value)} />
                                    <label htmlFor="frio">Frio</label>
                                </div>
                                <div className="field-radiobutton">
                                    <RadioButton id={field.name} inputId="caliente" value="CALIENTE" onChange={(e) => field.onChange(e.value)} />
                                    <label htmlFor="caliente">Caliente</label>
                                </div>
                            </div>
                        )} />
                    </div>
                    {/* <div className='flex'>
                        { displayLoading? <ProgressSpinner style={{ width: "2rem", height: "2rem" }} /> : <Button type="submit" label="Log In" className="mt-2" /> }
                    </div> */}
                    <Button type="submit" label="Añadir" className="mt-2" />
                </form>
            </Dialog>

            <Dialog visible={showDeletePlatoDialog} style={{ width: '450px' }} header="Confirmar" modal onHide={() => setShowDeletePlatoDialog(false)} footer={deleteDialogFooter}>
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                {platoSeleccionado && <span>Estas seguro que quieres borrar el plato <b>{platoSeleccionado.nombre}</b>?</span>}
            </Dialog>

            <div className="mt-5 mx-3">
                <Toolbar className="mb-4" left={toolbarActions} right={searchArea}></Toolbar>
                <DataTable value={platos} selectionMode="radiobutton" selection={platoSeleccionado} stripedRows onSelectionChange={e => setPlatoSeleccionado(e.value)} dataKey="id" responsiveLayout="scroll">
                    <Column selectionMode="single" headerStyle={{width: '3em'}}></Column>
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="nombreReal" header="Nombre Real"></Column>
                    <Column field="nombreEng" header="English Name"></Column>
                    <Column field="continente" header="Continente"></Column>
                    <Column field="sabor" header="Sabor"></Column>
                    <Column field="temperatura" header="Temperatura"></Column>
                    <Column field="editar" header="Editar"></Column>
                </DataTable>
            </div>
        </div>
        
    )
}
                 