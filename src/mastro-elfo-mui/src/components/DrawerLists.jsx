import React, { Fragment } from "react";
import PropTypes from "prop-types";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader
} from "@material-ui/core";

/**
 * [DrawerLists description]
 * @param       {Array} [lists=[] }] [description]
 * @constructor
 */
export default function DrawerLists({ lists = [] }) {
  return (
    <Fragment>
      {lists.map(
        ({
          avatar = false,
          header = "",
          items = [],
          key,
          leftFill = false,
          rightFill = false
        }) => (
          <List key={key} subheader={<ListSubheader>{header}</ListSubheader>}>
            {items.map(
              ({
                action = null,
                icon = null,
                key,
                onClick = false,
                primary = "",
                secondary = ""
              }) => (
                <ListItem
                  key={key}
                  button={Boolean(onClick)}
                  onClick={Boolean(onClick) ? onClick : () => {}}
                >
                  {(!!icon || leftFill) &&
                    (avatar ? (
                      <ListItemAvatar>{icon || <span />}</ListItemAvatar>
                    ) : (
                      <ListItemIcon>{icon || <span />}</ListItemIcon>
                    ))}

                  <ListItemText primary={primary} secondary={secondary} />

                  {(!!action || rightFill) && (
                    <ListItemSecondaryAction>
                      {action || <span />}
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
              )
            )}
          </List>
        )
      )}
    </Fragment>
  );
}

DrawerLists.propTypes = {
  lists: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      avatar: PropTypes.bool,
      header: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
            .isRequired,
          action: PropTypes.node,
          icon: PropTypes.node,
          onClick: PropTypes.func,
          primary: PropTypes.string,
          secondary: PropTypes.string
        })
      ),
      leftFill: PropTypes.bool,
      rightFill: PropTypes.bool
    })
  )
};
