// import { useEffect, useState } from 'react';

// const useDynamicFont = () => {
//   const [fontLoaded, setFontLoaded] = useState(false);

//   useEffect(() => {
//     const loadFont = async () => {
//       try {
//         // Dynamically load the Inter font from @fontsource/inter
//         await import('@fontsource/inter');
//         setFontLoaded(true);
//       } catch (error) {
//         console.error('Error loading font:', error);
//         setFontLoaded(false);
//       }
//     };

//     loadFont();
//   }, []);

//   return fontLoaded;
// };

// export default useDynamicFont;
