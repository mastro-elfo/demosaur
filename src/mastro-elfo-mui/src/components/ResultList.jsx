import React from "react";
import PropTypes from "prop-types";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@material-ui/core";

import { Condition } from "./";

/**
 * Organizes a List with optional SubHeader
 *
 * If `results` is `null` or `undefined`, then prints nothing.
 *
 * Otherwise `results` must be an array, for each item `mapper` is called and must provide at least a unique `key`.
 *
 * Also `LeftIcon` and `RightIcon` are used inside a `ListItemIcon`, and `primary` and `secondary` are used with `ListItemText`.
 *
 * Anything else is passed to `ListItem`. By default `onClick` sets `button` to `true`.
 * @param  {[type]} subheader [description]
 * @param  {[type]} [mapper=r => r] [description]
 * @param  {[type]} results   [description]
 * @param  {[type]} others    [description]
 * @return {[type]}           [description]
 */
export default function ResultList({
  mapper = r => r,
  results,
  subheader,
  ...others
}) {
  return (
    <Condition show={results !== null && results !== undefined}>
      <List
        subheader={!!subheader && <ListSubheader>{subheader}</ListSubheader>}
        {...others}
      >
        {results &&
          results.map(r => {
            const {
              LeftIcon,
              RightIcon,
              rightAction,
              primary,
              secondary,
              onClick,
              ...others
            } = mapper(r);
            // TODO: // Deprecated: RightIcon, remove in version 2
            if (!!RightIcon)
              console.warn(
                "RightIcon is deprecated and will be removed in next major version"
              );

            return (
              <ListItem button={!!onClick} onClick={onClick} {...others}>
                {!!LeftIcon && <ListItemIcon>{LeftIcon}</ListItemIcon>}

                <ListItemText primary={primary} secondary={secondary} />

                {!!RightAction && rightAction}
                {!RightAction && !!RightIcon && (
                  <ListItemIcon>{RightIcon}</ListItemIcon>
                )}
              </ListItem>
            );
          })}
      </List>
    </Condition>
  );
}

ResultList.propTypes = {
  mapper: PropTypes.func,
  results: PropTypes.array,
  subheader: PropTypes.string
};
