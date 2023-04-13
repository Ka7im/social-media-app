import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        dark: {
            component: string;
            text: string;
            selected: string;
            hover: string;
            main: string;
        };
    }
}
