import SecureLS from "secure-ls";
import { useEffect, useState } from "react";

const ls = new SecureLS({
    encodingType: "aes",
    isCompression: false,
});

function useSecureLs(key, initValue = null) {
    const [value, setValue] = useState(() => {
        const data = ls.get(key);
        return data !== null ? data : initValue;
    });

    useEffect(() => {
        ls.set(key, value);
    }, [key, value]);

    return [value, setValue];
}

export default useSecureLs;