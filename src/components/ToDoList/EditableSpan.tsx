import { TextField } from "@mui/material";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type EditableSpanPropsType = {
  title: string;
  onCange: (newValue: string) => void;
};
export function EditableSpan(props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.title || "");

  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    props.onCange(title);
  }
  function onKeyDownHandler(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      props.onCange(title);
      setEditMode(false);
    }
  }

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const deactivateEditMode = () => {
    props.onCange(title);
    setEditMode(false);
  };
  return editMode ? (
    <TextField
      value={title}
      id="standard-basic"
      variant="standard"
      onBlur={deactivateEditMode}
      autoFocus
      onChange={onChangeHandler}
      onKeyDown={onKeyDownHandler}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{title}</span>
  );
}
