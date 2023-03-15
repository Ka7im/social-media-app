import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        dark: {
            component: string;
            text: string;
            hover: string;
            main: string;
        };
    }
}
