const ACCESS_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const USERNAME_KEY = "user-name";
const USER_EMAIL_KEY = "user-email";

export function setTokens({
                              refreshToken,
                              accessToken,
                              userId,
                              expiresIn = 3600,
                              userName,
                              email
                          }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate.toString());
    localStorage.setItem(USERID_KEY, userId);
    if (userName && email) {
        localStorage.setItem(USERNAME_KEY, userName);
        localStorage.setItem(USER_EMAIL_KEY, email);
    }
}
export function updateUserData({
                              userName,
                              email
                          }) {
    localStorage.setItem(USERNAME_KEY, userName);
    localStorage.setItem(USER_EMAIL_KEY, email);
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

export function getUserName() {
    return localStorage.getItem(USERNAME_KEY);
}

export function getUserEmail() {
    return localStorage.getItem(USER_EMAIL_KEY);
}

export function removeAuthData() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
}

const localStorageService = {
    setTokens,
    updateUserData,
    getAccessToken,
    getRefreshToken,
    getExpiresDate,
    getUserId,
    getUserName,
    getUserEmail,
    removeAuthData
};

export default localStorageService;
