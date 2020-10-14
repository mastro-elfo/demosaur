import React from "react";

import { deburr } from "lodash";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { v1 } from "uuid";

import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  TextField
  // Typography
} from "@material-ui/core";
import { Collection, pluralize } from "../mastro-elfo-mui/";

import AllInboxIcon from "@material-ui/icons/AllInbox";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DeleteIcon from "@material-ui/icons/Delete";

function Component() {
  const { push } = useHistory();

  return (
    <Collection
      cid="stock"
      search={search}
      load={load}
      save={save}
      CollectionProps={{
        title: "Stocks",
        ResultListProps: {
          subheader: r =>
            r
              ? `${r.length} ${pluralize(r.length, "stock", "stocks")} found`
              : "",
          mapper: ({ active, description, id, name }) => ({
            key: id,
            primary: name,
            secondary: description,
            rightAction: active ? null : (
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
            ),
            onClick: () => push(`/stock/v/${id}`)
          })
        },
        SearchFieldProps: { fullWidth: true }
      }}
      ViewProps={{ render: ViewRender }}
      NewProps={{
        render: NewRender,
        data: { active: true, barcode: "", description: "", name: "" }
      }}
      EditProps={{ render: EditRender }}
    />
  );
}

export const route = {
  path: "/stock",
  component: Component
};

export const drawer = {
  key: "stock",
  primary: "Stock",
  secondary: "",
  icon: <AllInboxIcon />,
  title: "Open stock app"
};

function ViewRender(data) {
  const { active, barcode, description, name } = data;
  return (
    <List>
      <ListItem>
        <ListItemText primary={barcode} secondary="Barcode" />
      </ListItem>
      <ListItem>
        <ListItemText primary={name} secondary="Name" />
      </ListItem>
      <ListItem>
        <ListItemText primary={description} secondary="Description" />
      </ListItem>
      <ListItem>
        {!active && (
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
        )}
        <ListItemText primary={active ? "Active" : "Archived"} />
      </ListItem>
    </List>
  );
}

function EditRender(data, setData) {
  const { go } = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { active, barcode, description, id, name } = data;

  const handleDeleteForever = () => {
    del(id)
      .then(() => {
        go(-2);
      })
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  return (
    <List>
      <ListItem>
        <TextField
          fullWidth
          label="Barcode"
          value={barcode}
          onChange={({ target: { value } }) =>
            setData({ ...data, barcode: value })
          }
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={({ target: { value } }) =>
            setData({ ...data, name: value })
          }
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={({ target: { value } }) =>
            setData({ ...data, description: value })
          }
        />
      </ListItem>
      <ListItem button onClick={() => setData({ ...data, active: !active })}>
        <ListItemIcon>
          <Checkbox disableRipple checked={active} />
        </ListItemIcon>
        <ListItemText primary={active ? "Active" : "Archived"} />
        {!active && (
          <ListItemSecondaryAction>
            <IconButton onClick={handleDeleteForever}>
              <DeleteForeverIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </List>
  );
}

function NewRender(data, setData) {
  const { barcode, description, name } = data;
  return (
    <List>
      <ListItem>
        <TextField
          fullWidth
          label="Barcode"
          value={barcode}
          onChange={({ target: { value } }) =>
            setData({ ...data, barcode: value })
          }
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={({ target: { value } }) =>
            setData({ ...data, name: value })
          }
        />
      </ListItem>
      <ListItem>
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={({ target: { value } }) =>
            setData({ ...data, description: value })
          }
        />
      </ListItem>
    </List>
  );
}

function search(q, d) {
  const query = d.trim().toLowerCase();
  return readAll().then(r =>
    r.filter(
      ({ barcode, description, name }) =>
        deburr(barcode.trim().toLowerCase()).indexOf(query) !== -1 ||
        deburr(description.trim().toLowerCase()).indexOf(query) !== -1 ||
        deburr(name.trim().toLowerCase()).indexOf(query) !== -1
    )
  );
}

function load(id) {
  return read(id);
}

function save(data) {
  if (data.id) {
    // Update
    return update(data.id, data);
  } else {
    // Create
    return create(data);
  }
}

// CRU[D]

function create(data) {
  return new Promise((res, rej) => {
    const d = { ...data, id: v1() };
    const stocks = sessionStorage.getJson("stocks", []);
    stocks.push(d);
    sessionStorage.setJson("stocks", stocks);
    res(d);
  });
}

function read(id) {
  return new Promise((res, rej) => {
    const stocks = sessionStorage.getJson("stocks", []);
    const item = stocks.find(i => i.id === id);
    if (item) res(item);
    else rej(new Error("Item not found"));
  });
}

function readAll() {
  return new Promise(res => {
    res(sessionStorage.getJson("stocks", []));
  });
}

function update(id, data) {
  return new Promise((res, rej) => {
    const stocks = sessionStorage.getJson("stocks", []);
    const index = stocks.findIndex(i => i.id === id);
    if (index !== -1) {
      stocks[index] = { ...data, id };
      sessionStorage.setJson("stocks", stocks);
      res({ ...data, id });
    } else rej(new Error("Item not found"));
  });
}

function del(id) {
  return new Promise((res, rej) => {
    const stocks = sessionStorage.getJson("stocks", []);
    const index = stocks.findIndex(i => i.id === id);
    if (index !== -1) {
      stocks.splice(index, 1);
      sessionStorage.setJson("stocks", stocks);
      res({ id });
    } else rej(new Error("Item not found"));
  });
}
