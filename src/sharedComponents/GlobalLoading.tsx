import React from 'react'
import Lottie from 'react-lottie';
import { dimensions } from '../assets/lib/Constants';

export default function GlobalLoading() {
    return (
        <div style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            top: '50%',
            bottom: 0,
            right: 0,
            zIndex: 99,
            width: '100%',
        }}>
            <Lottie
                options={{
                    animationData: require('../assets/loading/9809-loading.json'),
                    autoplay: true,
                    loop: true,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                }}

                height={dimensions.screenWidth*0.1}
                width={dimensions.screenWidth*0.1}
            />
        </div>
    )
}
