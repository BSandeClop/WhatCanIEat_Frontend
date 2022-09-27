import React from 'react';
import '../../styles/App.css';
import { AdminTable } from '../AdminTable';
import { Navbar } from '../Navbar'

export const Admin = () => {
    return (
          <div className='flex flex-column min-h-screen'>
            <Navbar inHome={false} inAdmin={true} />
            <AdminTable />
          </div>
    );
}