import { IconButton, TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { green } from "@mui/material/colors";
import { AddCircleOutline } from "@mui/icons-material";

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
      trimmedItemTitle ? props.addItem(trimmedItemTitle) : setError("no text");
      setNewItemTitle("");
    }
  }
  function addTask() {
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
      <TextField
        id="outlined-basic"
        label="Add to do"
        variant="outlined"
        value={newItemTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        error={!!error}
        helperText={error}
      />

      <IconButton onClick={addTask}>
        {" "}
        <AddCircleOutline sx={{ color: green[500] }}></AddCircleOutline>
      </IconButton>
    </div>
  );
}
