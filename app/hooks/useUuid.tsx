import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

import { v4 as uuidv4, v1 as uuidv1 } from "uuid";

export const useUuid = () => {
  const [uuid, setUuid] = useLocalStorage("uuid", "");

  useEffect(() => {
    if (!uuid) {
      setUuid(uuidv4());
      //   setUuid((Math.random() * 10000).toFixed(0));
    }
  }, [uuid]);

  return { uuid, setUuid };
};
