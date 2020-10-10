import React, { createRef, useEffect, useState } from "react";
import { BackIconButton, Content, Header, Page } from "../mastro-elfo-mui/";
import ListIcon from "@material-ui/icons/List";

import { v1 } from "uuid";
import { useSnackbar } from "notistack";

import {
  Checkbox,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  // ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  TextField
} from "@material-ui/core";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const ref = createRef();

function Component() {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // read all from sessionStorage
    setList(sessionStorage.getJson("todolist", []));
  }, []);

  useEffect(() => {
    sessionStorage.setJson("todolist", list);
  }, [list]);

  const handleAdd = () => {
    setList([{ id: v1(), checked: false, text }, ...list]);
    setText("");
    ref.current.focus();
  };

  const handleToggle = id => {
    const copy = list.slice();
    const index = copy.findIndex(item => item.id === id);
    if (index !== -1) {
      copy[index].checked = !copy[index].checked;
      setList(copy);
    } else {
      enqueueSnackbar("Item not found", { variant: "error" });
    }
  };

  const handleDelete = id => {
    const copy = list.slice();
    const index = copy.findIndex(item => item.id === id);
    if (index !== -1) {
      copy.splice(index, 1);
      setList(copy);
    } else {
      enqueueSnackbar("Item not found", { variant: "error" });
    }
  };

  const todo = list.filter(({ checked }) => !checked);
  const done = list.filter(({ checked }) => checked);

  return (
    <Page
      header={<Header LeftAction={<BackIconButton />}>ToDo List</Header>}
      content={
        <Content>
          <TextField
            fullWidth
            label="Add item"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleAdd}>
                    <AddCircleIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            value={text}
            onChange={({ target: { value } }) => setText(value)}
            onKeyPress={({ key }) => (key === "Enter" ? handleAdd() : null)}
            ref={ref}
          />

          <List
            subheader={<ListSubheader>To Do ({todo.length})</ListSubheader>}
          >
            {todo.map(item => (
              <Item
                key={item.id}
                {...item}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </List>
          <List subheader={<ListSubheader>Done ({done.length})</ListSubheader>}>
            {done.map(item => (
              <Item
                key={item.id}
                {...item}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))}
          </List>
        </Content>
      }
    />
  );
}

function Item({ checked, id, text, onDelete, onToggle }) {
  return (
    <ListItem button onClick={() => onToggle(id)}>
      <ListItemIcon>
        <Checkbox disableRipple checked={checked} />
      </ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          color: checked ? "textSecondary" : "initial"
        }}
      />
      <ListItemSecondaryAction>
        <IconButton onClick={() => onDelete(id)}>
          <DeleteForeverIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export const route = {
  path: "/todolist",
  exact: true,
  component: Component
};

export const drawer = {
  key: "todolist",
  primary: "ToDo List",
  secondary: "",
  icon: <ListIcon />,
  title: "Open ToDo List app"
};
