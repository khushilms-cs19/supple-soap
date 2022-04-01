import axios from "axios";
import { useState } from "react";

const useRequests = ({ route, method, body, onSuccess, onFailure = null }) => {
    const [errors, setErrors] = useState(null);
    const baseUrl = "http://localhost:5000";
    const doRequest = async (props = {}) => {
        try {
            setErrors(null);
            const response = await axios({
                method: method,
                url: `${baseUrl}${route}`,
                data: body ? body : null,
                headers: {
                    "Authentication": localStorage.getItem("user"),
                }
            });
            console.log(response.data);
            if (onSuccess) {
                onSuccess(response.data);
            }
            return response.data;
        } catch (err) {
            if (onFailure) {
                onFailure();
            }
            throw new Error("something went wrong");
        }
    }
    return {
        doRequest,
        errors
    }
}
export default useRequests;