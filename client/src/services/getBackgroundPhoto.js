const getBackgroundPhoto = async () => {
    try {
        const response = await fetch("/api/v1/landscape");
        if (!response.ok) {
            const error = new Error(`${response.status} (${response.statusText})`);
            throw error;
        }
        const responseUrl = await response.json();
        return responseUrl;
    } catch (error) {
        return error.message;
    }
};
export default getBackgroundPhoto;
