import React, { createRef, useEffect, useState } from "react";
import { BackIconButton, Content, Footer, Header, Page } from "mastro-elfo-mui";
import List from "me-sortable";

import { v1 } from "uuid";

import {
  BottomNavigation,
  BottomNavigationAction,
  Checkbox,
  IconButton,
  InputAdornment,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  TextField,
} from "@material-ui/core";

import AddBoxIcon from "@material-ui/icons/AddBox";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ListIcon from "@material-ui/icons/List";

const ref = createRef();

function Component() {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  useEffect(() => {
    const list = sessionStorage.getJson("todolist", []);
    setTodoList(list.filter(({ checked }) => !checked));
    setDoneList(list.filter(({ checked }) => checked));
  }, []);

  useEffect(() => {
    sessionStorage.setJson("todolist", [
      ...todoList.map((item) => ({ ...item, checked: false })),
      ...doneList.map((item) => ({ ...item, checked: true })),
    ]);
  }, [todoList, doneList]);

  const handleAdd = () => {
    setTodoList([{ id: v1(), text }, ...todoList]);
    setText("");
    ref.current.focus();
  };

  const handleToggle = (id) => {
    const todoItem = todoList.find((item) => item.id === id);
    const doneItem = doneList.find((item) => item.id === id);
    if (todoItem) {
      setTodoList((list) => list.filter((item) => item.id !== id));
      setDoneList((list) => [todoItem, ...list]);
    } else if (doneItem) {
      setTodoList((list) => [doneItem, ...list]);
      setDoneList((list) => list.filter((item) => item.id !== id));
    }
  };

  const handleDelete = (id) => {
    setTodoList((list) => list.filter((item) => item.id !== id));
    setDoneList((list) => list.filter((item) => item.id !== id));
  };

  const handleBottomAction = (_, action) => {
    if (action === "clear") {
      setTodoList([]);
      setDoneList([]);
    } else if (action === "fill") {
      const fill = mock.slice(0, 10).map((i) => ({ ...i, id: v1() }));
      while (fill.length > 0) {
        const [item] = fill.splice(0, 1);
        if (Math.random() < 0.5) {
          setTodoList((list) => [...list, item]);
        } else {
          setDoneList((list) => [...list, item]);
        }
      }
    }
  };

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
              ),
            }}
            value={text}
            onChange={({ target: { value } }) => setText(value)}
            onKeyPress={({ key }) => (key === "Enter" ? handleAdd() : null)}
            ref={ref}
          />

          <List
            subheader={<ListSubheader>To Do ({todoList.length})</ListSubheader>}
            update={setTodoList}
            ContainerProps={{
              groupName: "1",
              getChildPayload: (index) => todoList[index],
            }}
          >
            {todoList.map((item) =>
              mapper({
                ...item,
                onToggle: handleToggle,
                onDelete: handleDelete,
                checked: false,
              })
            )}
          </List>

          <List
            subheader={<ListSubheader>Done ({doneList.length})</ListSubheader>}
            update={setDoneList}
            ContainerProps={{
              groupName: "1",
              getChildPayload: (index) => doneList[index],
            }}
          >
            {doneList.map((item) =>
              mapper({
                ...item,
                onToggle: handleToggle,
                onDelete: handleDelete,
                checked: true,
              })
            )}
          </List>
        </Content>
      }
      footer={
        <Footer separator={<BottomNavigation />}>
          <BottomNavigation onChange={handleBottomAction}>
            <BottomNavigationAction
              label="Fill"
              value="fill"
              icon={<AddBoxIcon />}
            />
            <BottomNavigationAction
              label="Clear"
              value="clear"
              icon={<ClearAllIcon />}
            />
          </BottomNavigation>
        </Footer>
      }
    />
  );
}

function mapper({ checked, id, text, onDelete, onToggle }) {
  return (
    <ListItem key={id} button onClick={() => onToggle(id)}>
      <ListItemIcon>
        <Checkbox disableRipple checked={checked} />
      </ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          color: checked ? "textSecondary" : "initial",
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
  component: Component,
};

export const drawer = {
  key: "todolist",
  primary: "ToDo List",
  secondary: "",
  icon: <ListIcon />,
  title: "Open ToDo List app",
};

const mock = [
  { text: "Climb Mount Everest" },
  { text: "Learn a new programming language" },
  { text: "Read a new book" },
  { text: "Drink water" },
  { text: "Eat healty food" },
  { text: "Make new friends" },
  { text: "Commit on GitHub" },
];
