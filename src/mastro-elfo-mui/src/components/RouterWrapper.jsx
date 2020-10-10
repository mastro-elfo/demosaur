import React from "react";

import {
  // See https://reacttraining.com/react-router/web/guides/quick-start for details
  MemoryRouter,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Wrapper } from "./";

/**
 * Router wrapper that use "react-router-dom" to create routes.
 *
 * By default uses `MemoryRouter`; this can be changed with `Router` param. `Routes` and optional `Redirect` are inside a `Switch`.
 *
 * `routes` is an array of `Route` params; No need to specify a unique `key`. It defaults to `[]`
 *
 * If `redirect` is specified, this is passed to the `to` param of a `Redirect` component.
 *
 * Anything else is passed to `Router`.
 *
 * @see: https://reacttraining.com/react-router/web/guides/quick-start
 * @param  {[type]} [Router=MemoryRouter] [description]
 * @param  {Array}  [routes=[]]           [description]
 * @param  {[type]} [redirect=null]       [description]
 * @param  {Object} [WrapperProps={}]     [description]
 * @param  {[type]} others                [description]
 * @return {[type]}                       [description]
 */

export default function({
  Router = MemoryRouter,
  routes = [],
  redirect = null,
  WrapperProps = {},
  ...others
}) {
  return (
    <Router {...others}>
      <Wrapper {...WrapperProps}>
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
          {!!redirect && <Redirect to={redirect} />}
        </Switch>
      </Wrapper>
    </Router>
  );
}
