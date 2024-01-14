import { useContext } from 'react';
import { ThemeContext } from 'context/ThemeContext';

const Logo = () => {
  const { selectedTheme } = useContext(ThemeContext);
  return (
    <svg
      viewBox="0 0 512 512"
      style={{ width: '64px' }}
      fill={selectedTheme === 'light' ? '#36454f' : '#e5e6eb'}
    >
      <g>
        <path
          d="M98.5,233.5c24.8,0,45-20.2,45-45s-20.2-45-45-45s-45,20.2-45,45S73.7,233.5,98.5,233.5z M413.5,233.5
		c24.8,0,45-20.2,45-45s-20.2-45-45-45s-45,20.2-45,45S388.7,233.5,413.5,233.5z M436,256h-45c-12.4,0-23.6,5-31.7,13.1
		c28.3,15.5,48.4,43.6,52.8,76.9h46.4c12.4,0,22.5-10.1,22.5-22.5V301C481,276.2,460.8,256,436,256z M256,256
		c43.5,0,78.8-35.2,78.8-78.8S299.5,98.5,256,98.5s-78.8,35.2-78.8,78.8S212.5,256,256,256z M310,278.5h-5.8
		c-14.6,7-30.9,11.2-48.2,11.2s-33.5-4.2-48.2-11.2H202c-44.7,0-81,36.3-81,81v20.2c0,18.6,15.1,33.8,33.8,33.8h202.5
		c18.6,0,33.8-15.1,33.8-33.8v-20.2C391,314.8,354.7,278.5,310,278.5z M152.7,269.1C144.6,261,133.4,256,121,256H76
		c-24.8,0-45,20.2-45,45v22.5c0,12.4,10.1,22.5,22.5,22.5h46.3C104.3,312.7,124.4,284.6,152.7,269.1L152.7,269.1z"
        />
      </g>
    </svg>
  );
};

export default Logo;