import { createGlobalStyle } from 'styled-components';
import { Animations } from './animations';
import { Base } from './base';
import { ColorPalette } from './colors';
import { Layout } from './layout';
import { Mixins } from './mixins';
import { Scrollbar } from './scrollbar';
// Ok so the full list of what you want me to do is what
//Namespaces are weird i deleted it lmao

/* 
    Anyways:
    1. translate all of the scss vars to typescript vars so for example follow

*/

export const GlobalStyle = createGlobalStyle`
        // shrink the font size on small screens
        //! FUTURE TREVOR: Fix the flexboxes in InfoFlow
        //make variables for all the screen breakpoints
        ${ColorPalette}
		${Mixins}
		${Scrollbar}
		${Base}
		${Layout}
		${Animations}
        
        
        
        `;
