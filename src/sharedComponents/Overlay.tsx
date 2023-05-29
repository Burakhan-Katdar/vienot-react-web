import React, { useContext } from 'react'
import { SharedContextModel } from '../assets/lib/Models';
import { SharedContext } from '../assets/lib/SharedContext';

export default function Overlay() {
    const currentContext: SharedContextModel | any = useContext(SharedContext);
    
    if (currentContext.showOverlay) {
        return (
            <div style={{
                flex: 1,
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                right: 0,
                overflowY:'hidden',
                overflowX:'hidden',
                opacity: 0.5,
                backgroundColor: 'black',
                width: '100%',
                height:'150%',
                zIndex: 9
            }}></div>
        )
    }
    else {
        return null
    }
}
