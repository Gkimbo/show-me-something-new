import _ from "lodash";

let translateServerErrors = (errors: any) => {
    let serializedErrors = {};

    Object.keys(errors).forEach((key) => {
        const messages = errors[key].map((error: any) => {
            const field = _.startCase(key);
            serializedErrors = {
                ...serializedErrors,
                [field]: error.message,
            };
        });
    });
    return serializedErrors;
};

export default translateServerErrors;
