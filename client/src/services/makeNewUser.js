const makeNewUser = async (input) => {
    try {
        const response = await fetch("/api/v1/users", {
            method: "post",
            body: JSON.stringify(input),
            headers: new Headers({
                "Content-Type": "application/json",
            }),
        });
        if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
        }
        const userData = await response.json();
    } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
    }
};
export default makeNewUser;
