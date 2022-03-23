import React from 'react'

function YourSelection() {
    return (
        <>
            <h4 className='your-order-title'>Your Order</h4>
            <div className='your-order-content'>
                <div className='your-order-item'>
                    <p>1. Base</p>
                    <p>Shea Butter</p>
                </div>
                <div className='your-order-item'>
                    <p>2. Scrub</p>
                    <p>Sugar & Honey</p>
                </div>
                <div className='your-order-item'>
                    <p>3. Type</p>
                    <p>Banana</p>
                </div>
                <div className='your-order-item'>
                    <p>4. Fragrance</p>
                    <p>Floral</p>
                </div>
                <div className='your-order-item'>
                    <p>5. Essential Oil</p>
                    <p>Clove</p>
                </div>
            </div>
        </>
    )
}

export default YourSelection;