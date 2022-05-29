import Button from '@mui/material/Button';
import React from 'react';

type PopupProps = {
    header: String
    content: String
    setElement: React.Dispatch<React.SetStateAction<boolean>>
}

function Popup({ header, content, setElement }: PopupProps) {
    return(
     <section className='popupMsg'>
        <h1>{header}</h1>
        <p>{content}</p>
        <Button variant='text' onClick={() => setElement(false)}>Close</Button>
    </section>
    )
}

export default Popup;