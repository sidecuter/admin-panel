import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

export default function App() {
    return (
        <CssVarsProvider disableTransitionOnChange defaultColorScheme={'dark'}>
            <CssBaseline />
        </CssVarsProvider>
    );
}