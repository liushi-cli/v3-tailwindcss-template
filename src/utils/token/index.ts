export const token_key = import.meta.env.VITE_APP_TOKEN_KEY

const getToken = (): string | null | undefined => {
    return localStorage.getItem(token_key)
}

const setToken = (token: string) => {
    return localStorage.setItem(token_key, token)
}

const removeToken = (): void => {
    return localStorage.removeItem(token_key)
}

export { getToken, setToken, removeToken }
