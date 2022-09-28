import React, { useState, useEffect, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { useForm, Controller } from 'react-hook-form';
import { classNames } from 'primereact/utils';
import { getJwt } from '../services/LoginService';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Navigate} from 'react-router-dom';

export const LoginCard = () => {
    
    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayLoading, setDisplayLoading] = useState(false);
    const [goAdmin, setGoAdmin] = useState(false);

    const toast = useRef(null);

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const onSubmit = async (data) => { 
        try {
            setDisplayLoading(true);
            const res = await getJwt(data.username, data.password);
            if (res.status === 200) {
                setGoAdmin(true); 
                //TODO Implementar globalstate: loggedIn
            }
        } catch (error) {
            if (error.response?.status === 403) {
                toast.current.show({severity:'error', summary: 'Credenciales incorrectas', detail: 'Las credenciales ingresadas son incorrectas', closable: false, life: 3000});
                
            } else {
                toast.current.show({severity:'error', summary: 'Error inesperado', detail: 'Ha ocurrido un error interno en el servidor', closable: false, life: 3000});
            }
        } finally {
            setDisplayLoading(false);
        }
    }

    const title = <span>Admin Login</span>

    const { control, formState: { errors }, handleSubmit, reset } = useForm({});

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };

    return(
        <div>
            <Toast ref={toast} />
                {goAdmin && <Navigate to="/admin" />}
                <div className="flex justify-content-center">
                <Button onClick={() => onClick("displayBasic")} icon="pi pi-key" label='Admin' className='p-button-secondary' />
                <Dialog header={title} visible={displayBasic} onHide={() => onHide("displayBasic")} resizable={false} draggable={false}>
                    <div className="card">
                        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="username" control={control} rules={{ required: 'Se requiere un usuario' }} render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                                    )} />
                                    <label htmlFor="name" className={classNames({ 'p-error': errors.name })}>Usuario</label>
                                </span>
                                {getFormErrorMessage('name')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller name="password" control={control} rules={{ required: 'Se requiere una contraseña' }} render={({ field, fieldState }) => (
                                        <Password id={field.name} toggleMask {...field} className={classNames({ 'p-invalid': fieldState.invalid })} feedback={false} />
                                    )} />
                                    <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Contraseña</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div>
                            <div className='flex'>
                                { displayLoading? <ProgressSpinner style={{ width: "2rem", height: "2rem" }} /> : <Button type="submit" label="Log In" className="mt-2" /> }
                            </div>
                        </form>
                    </div>
                </Dialog>
            </div>
        </div>
        
    )
}