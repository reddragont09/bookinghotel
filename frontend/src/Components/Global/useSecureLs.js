import SecureLS from "secure-ls";
import { useEffect, useState } from "react";

const ls = new SecureLS({
    encodingType: "aes",
    isCompression: false,
});

function useSecureLs(key, initValue = null) {
    const [value, setValueState] = useState(() => {
        const data = ls.get(key);
        return data !== null ? data : initValue;
    });

    const setValue = (newValue) => {
        ls.set(key, newValue);      // lưu ngay lập tức
        setValueState(newValue);    // cập nhật state
    };

    const removeValue = () => {
        ls.remove(key);
        //setValueState(initValue);
    };

    return [value, setValue, removeValue];
}

export default useSecureLs;