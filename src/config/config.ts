import { ConfigProps } from '../customers/interfaces/config.interface';

export const config = (): ConfigProps => ({
    port: parseInt(process.env.PORT, 10) || 8080,
});