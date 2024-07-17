import React from 'react'
import Portal from './Portal'
import './Swirl.css'

const Swirl = () => {
  return (
    <>
 
    <div className='outer-div'>
    <Portal/>
        <div className='sw'>
            <div className = "swirl">
                
                    <div className = "swirl-active ">
                    </div>
                    <div className = "swirl-con">
                    </div>
              
            </div>
        </div>
    </div>
    </>
  );
}

export default Swirl
