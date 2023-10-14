import React from 'react'
import Vnavbar from '../../../components/Admin/verNavbar/Vnavbar';
import Navbar from '../../../components/Admin/Navbar/Navbar';
import Verifications from '../../../components/Admin/Verification/Verification';

const Verification = () => {
  return (
    <div style={{ display: 'flex', marginTop: 0 }}>
    <Vnavbar  />
    <div style={{ flex: '1', paddingTop: 0 }}>
      <Navbar />
      <div className="mt-4" style={{ width: '100%' }}>
      <Verifications/>
      </div>
    </div>
  </div>
  )
}

export default Verification
