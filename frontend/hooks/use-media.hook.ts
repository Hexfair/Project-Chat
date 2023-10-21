import { useMediaQuery } from 'react-responsive';
//=========================================================================================================================

/* Хук для изменения параметров на мобильных/планшетных устройствах */
export const useMedia = () => {
	const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
	const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
	return { isMobile, isTablet }
}

