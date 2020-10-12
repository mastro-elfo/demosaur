import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Switch, Route, useParams, useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { CircularProgress, Grid, IconButton } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";

import {
  BackIconButton,
  Conditional,
  Content,
  Header,
  LoadingIconButton,
  Page,
  SearchField,
  ResultList
} from "./";

import { evaluate } from "../utils";

/**
 * [Collection description]
 * @param       {[type]} cid        [description]
 * @param       {function} [search=()=>{}] [description]
 * @constructor
 */

export default function Collection({
  cid,
  search = () => Promise.reject(new Error("No search function provided")),
  load = () => Promise.reject(new Error("No load function provided")),
  save = () => Promise.reject(new Error("No save function provided")),
  CollectionProps = {
    title: "Collection",
    mapper: r => r,
    SearchFieldProps: {},
    ResultListProps: {
      subheader: null,
      mapper: r => r
    }
  },
  ViewProps = {
    title: "View Item",
    render: () => {}
  },
  NewProps = {
    title: "New Item",
    render: () => {},
    data: {}
  },
  EditProps = {
    title: "Edit Item",
    render: () => {}
  }
}) {
  return (
    <Switch>
      <Route path={`/${cid}/v/:id`}>
        <ViewItem cid={cid} load={load} {...ViewProps} />
      </Route>
      <Route path={`/${cid}/e/:id`}>
        <EditItem cid={cid} load={load} save={save} {...EditProps} />
      </Route>
      <Route path={`/${cid}/n`}>
        <NewItem cid={cid} save={save} {...NewProps} />
      </Route>
      <Route path={`/${cid}`}>
        <CollectionPage
          cid={cid}
          search={search}
          {...CollectionProps}
        ></CollectionPage>
      </Route>
    </Switch>
  );
}

Collection.propTypes = {
  cid: PropTypes.string.isRequired,
  // functions
  search: PropTypes.func,
  load: PropTypes.func,
  save: PropTypes.func
};

function CollectionPage({
  cid,
  search = Promise.reject(
    new Error("No search function provided to CollectionPage")
  ),
  title = "Collection",
  mapper = r => r,
  SearchFieldProps = {},
  ResultListProps = { mapper: r => r, subheader: null }
}) {
  const { push } = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [results, setResults] = useState(null);

  const handleSearch = (q, d) =>
    search(q, d)
      .then(r => setResults(r))
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });

  const handleClear = () => {
    setResults(null);
  };

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton />}
          RightActions={[
            <IconButton
              key="new"
              color="inherit"
              onClick={() => push(`/${cid}/n`)}
            >
              <AddIcon />
            </IconButton>
          ]}
        >
          {title}
        </Header>
      }
      content={
        <Content>
          <Grid container item justify="center">
            <SearchField
              label="Search"
              onSearch={handleSearch}
              onClear={handleClear}
              {...SearchFieldProps}
            />
          </Grid>{" "}
          <ResultList
            results={results}
            mapper={a => {
              // TODO: // DEPRECATED: Remove in version 2.0
              console.warn(
                "`mapper` is deprecated, use `ResultListProps.mapper` instead. Will be removed in version 2.0"
              );
              return mapper(a);
            }}
            {...ResultListProps}
            subheader={evaluate(ResultListProps.subheader, results)}
          />
        </Content>
      }
    />
  );
}

function ViewItem({
  load = Promise.reject(new Error("No load function provided to ViewItem")),
  ...others
}) {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState();

  useEffect(() => {
    load(id)
      .then(r => setData(r))
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
    // eslint-disable-next-line
  }, [id]);

  return (
    <Conditional
      show={data}
      Component={ViewPage}
      Alt={LoadingPage}
      data={data}
      {...others}
    />
  );
}

function ViewPage({ cid, title = "View Item", render = () => {}, data }) {
  const { push } = useHistory();
  const { id } = data;
  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton />}
          RightActions={[
            <IconButton
              key="edit"
              color="inherit"
              onClick={() => push(`/${cid}/e/${id}`)}
            >
              <EditIcon />
            </IconButton>
          ]}
        >
          {evaluate(title, data)}
        </Header>
      }
      content={<Content>{render(data)}</Content>}
    />
  );
}

function EditItem({
  load = Promise.reject(new Error("No load function provided to EditItem")),
  ...others
}) {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [data, setData] = useState();

  useEffect(() => {
    load(id)
      .then(r => setData(r))
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      });
    // eslint-disable-next-line
  }, [id]);

  return (
    <Conditional
      show={Boolean(data)}
      Component={EditPage}
      Alt={LoadingPage}
      data={data}
      setData={setData}
      {...others}
    />
  );
}

function EditPage({
  title = "Edit Item",
  render = () => {},
  data,
  setData,
  save = () =>
    Promise.reject(new Error("No save function provided to EditPage"))
}) {
  const { goBack } = useHistory();

  const handleSave = () => save(data).then(({ id }) => setTimeout(goBack, 100));

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton />}
          RightActions={[
            <LoadingIconButton key="save" color="inherit" callback={handleSave}>
              <SaveIcon />
            </LoadingIconButton>
          ]}
        >
          {evaluate(title, data)}
        </Header>
      }
      content={<Content>{render(data, setData)}</Content>}
    />
  );
}

function NewItem({ data: defaultData, ...others }) {
  const [data, setData] = useState(defaultData);
  return <NewPage data={data} setData={setData} {...others} />;
}

function NewPage({
  cid,
  title = "New Item",
  render,
  data,
  setData,
  save = Promise.reject(new Error("No save function provided to NewPage"))
}) {
  const { replace } = useHistory();

  const handleSave = () =>
    save(data).then(({ id }) => setTimeout(replace, 100, `/${cid}/v/${id}`));

  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton />}
          RightActions={[
            <LoadingIconButton key="save" color="inherit" callback={handleSave}>
              <SaveIcon />
            </LoadingIconButton>
          ]}
        >
          {evaluate(title, data)}
        </Header>
      }
      content={<Content>{render(data, setData)}</Content>}
    />
  );
}

function LoadingPage() {
  return (
    <Page
      header={
        <Header
          LeftAction={<BackIconButton />}
          RightActions={[<CircularProgress key="progress" color="secondary" />]}
        >
          Loading...
        </Header>
      }
    />
  );
}
