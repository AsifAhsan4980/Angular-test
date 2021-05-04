export const environment = {
    SERVER_URL: `./`,
    production: true,
    useHash: true,
    hmr: false,
    apiUrl: ((window as { [key: string]: any })['env']['apiUrl'] as string) || 'http://52.221.187.224',
    resumeUrl: ((window as { [key: string]: any })['env']['apiUrl'] as string) || 'http://13.212.68.212:3000'
};
