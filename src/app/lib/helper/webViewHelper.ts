import invoke from 'react-native-webview-invoke/browser';

type SaveTokenFn = (token: string) => void;
type GetTokenFn = () => Promise<string>;
type DeleteTokenFn = () => void;
type SavePreferences = (preferences: string) => void;
type GetPreferences = () => Promise<string>;

export const saveToken: SaveTokenFn = invoke.bind('saveToken');
export const getToken: GetTokenFn = invoke.bind('getToken');
export const deleteToken: DeleteTokenFn = invoke.bind('deleteToken');
export const savePreferences: SavePreferences = invoke.bind('savePreferences');
export const getPreferences: GetPreferences = invoke.bind('getPreferences');
