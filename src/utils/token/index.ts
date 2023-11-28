export const token_key = import.meta.env.VITE_APP_TOKEN_KEY

const getToken = (): string | null | undefined => {
    if (token_key)
        return localStorage.getItem(token_key)
}

const setToken = (token: string): void => {
    if (token_key)
        return localStorage.setItem(token_key, token)
}

const removeToken = (): void => {
    if (token_key)
        return localStorage.removeItem(token_key)
}

export { getToken, setToken, removeToken }
