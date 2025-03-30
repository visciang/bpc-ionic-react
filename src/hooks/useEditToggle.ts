import { useCallback, useState } from "react";

export type EditToggle = {
  editable: boolean;
  onToggle(): void;
};

export function useEditToggle(): EditToggle {
  const [editable, setEditable] = useState(false);
  const onToggle = useCallback(() => setEditable((e) => !e), []);
  return { editable, onToggle };
}
