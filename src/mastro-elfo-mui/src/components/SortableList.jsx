import React from "react";
import PropTypes from "prop-types";

import { Container, Draggable } from "react-smooth-dnd";

import { List, ListItem, ListItemIcon } from "@material-ui/core";

import DragHandleIcon from "@material-ui/icons/DragHandle";

/**
 * Extends a `List` with sortable items.
 *
 * Example
 *
 * ```js
 * const handleDrop = ({ removedIndex, addedIndex }) => {}
 *
 * <SortableList onDrop={handleDrop}>
 *  <ListItem>
 *    <ListItemIcon><Icon/></ListItemIcon>
 *    <ListItemText primary secondary/>
 *    <ListItemSecondaryAction><IconButton/></ListItemSecondaryAction>
 *  <ListItem>
 * </SortableList>
 * ```
 *
 * @param       {ListItem}  children
 * @param       {Boolean} [right=false] If `true` handler is on the right
 * @param       {Function}  onDrop      Callback function, called when an item is dropped
 * @param       {Component} [Handler] If provided, must contain a component with `className="drag-handle"`
 * @param       {any}  rest          Forwarded to `List`
 * @constructor
 */
export default function SortableList({
  children,
  handler = <Handler />,
  onDrop = () => {},
  right = false,
  ...rest
}) {
  const leftHandler = !right && handler;
  const rightHandler = !!right && handler;
  return (
    <List {...rest}>
      <Container dragHandleSelector=".drag-handle" lockAxis="y" onDrop={onDrop}>
        {!!children.map
          ? children.map(item => mapper(item, leftHandler, rightHandler))
          : mapper(children, leftHandler, rightHandler)}
      </Container>
    </List>
  );
}

SortableList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  handler: PropTypes.element,
  onDrop: PropTypes.func,
  right: PropTypes.bool
};

function mapper(
  { props: { children, ...rest }, key, ref },
  leftHandler,
  rightHandler
) {
  return (
    <Draggable key={key}>
      <ListItem {...rest} ref={ref}>
        {leftHandler}
        {children}
        {rightHandler}
      </ListItem>
    </Draggable>
  );
}

function Handler() {
  return (
    <ListItemIcon>
      <DragHandleIcon className="drag-handle" />
    </ListItemIcon>
  );
}
