import invoke from 'react-native-webview-invoke/browser';

type SaveTokenFn = (token: string) => void;
type GetTokenFn = () => Promise<string>;
type DeleteTokenFn = () => void;

export const saveToken: SaveTokenFn = invoke.bind('saveToken');
export const getToken: GetTokenFn = invoke.bind('getToken');
export const deleteToken: DeleteTokenFn = invoke.bind('deleteToken');
