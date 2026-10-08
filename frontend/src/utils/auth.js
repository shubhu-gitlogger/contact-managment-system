export const isLoggedIn = () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
        return false;
    }

    try {
        const payload = JSON.parse(
            atob(token.split(".")[1])
        );

        const currentTime = Date.now();

        if (payload.exp * 1000 < currentTime) {
            logout();
            return false;
        }

        return true;

    } catch (error) {
        logout();
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("adminRole");
};