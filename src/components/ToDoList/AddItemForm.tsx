import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (item: string) => void;
};
export function AddItemForm(props: AddItemFormPropsType) {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setError(null);
    setNewItemTitle(event.target.value);
  }

  function onKeyDownHandler(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const trimmedItemTitle = newItemTitle.trim();
      trimmedItemTitle
        ? props.addItem(trimmedItemTitle)
        : setError("no text");
      setNewItemTitle("");
    }
  }
  function addTask() {
    debugger;
    const trimmedItemTitle = newItemTitle.trim();
    if (trimmedItemTitle) {
      props.addItem(trimmedItemTitle);
    } else {
      console.log("addTask");
      setError("no text");
      return;
    }
    setNewItemTitle("");
  }
  return (
    <div>
      <input
        value={newItemTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? "error" : ""}
      />
      {<div className="error-message">{error}</div>}
      <button onClick={addTask}>+</button>
    </div>
  );
}
