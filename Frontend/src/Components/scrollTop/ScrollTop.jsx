import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollTop = () => {
    const { pathname } = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setVisible(false);
        }, 300);
    }, [pathname]);

    return (
        <div 
            className={`fixed bottom-5 right-5 bg-pink-500 text-white p-3 rounded-full shadow-lg transition-all duration-500 ${visible ? 'opacity-100 scale-110' : 'opacity-0 scale-90'}`}
        >
            ⬆
        </div>
    );
};

export default ScrollTop;
