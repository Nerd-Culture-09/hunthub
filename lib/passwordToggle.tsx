import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const usePasswordToggle = (): [string, JSX.Element] => {
  const [visible, setVisibility] = useState<boolean>(false);

  const Icon = visible ? (
    <EyeOff onClick={() => setVisibility((visibility) => !visibility)} className="cursor-pointer h-4 w-4" />
  ) : (
    <Eye onClick={() => setVisibility((visibility) => !visibility)} className="cursor-pointer h-4 w-4" />
  );

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default usePasswordToggle;
