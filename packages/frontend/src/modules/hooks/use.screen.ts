import { useMediaQuery } from 'react-responsive';

export const useScreen = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 425px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 426px) and (max-width: 768px)' });
  const isDesk = useMediaQuery({ query: '(min-width: 769px)' });
  return { isMobile, isTablet, isDesk };
};
