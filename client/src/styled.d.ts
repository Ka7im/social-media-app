import 'styled-components';
import { ITheme, ThemeEnums } from './types/styled';

declare module 'styled-components' {
    export interface DefaultTheme extends ITheme {
        type: ThemeEnums;
        colors: {
            componentBg: string;
            font: string;
            bg: string;
            hover: string;
            border: string;
            input: string;
        };
    }
}
export { ThemeEnums };
