/**
 * Main container for an application.
 *
 * Wraps the application with Theme, Error handler, Notifier and Router.
 * Wrappers can be configured with ThemeProps, NotifyProps and RouterProps.
 */

import React from "react";
import PropTypes from "prop-types";

import {
  ErrorWrapper,
  NotifyWrapper,
  RouterWrapper,
  SuspenseWrapper,
  ThemeWrapper,
  Wrapper
} from "./";

/**
 * App main container.
 *
 * Wraps application with Theme, Error handler, Notifier and Router.
 * @param       {Object} [NotifyProps={}]   [description]
 * @param       {Object} [RouterProps={}]   [description]
 * @param       {Object} [SuspenseProps={}] [description]
 * @param       {Object} [ThemeProps={}]    [description]
 * @param       {Object} [WrapperProps={}}] [description]
 * @constructor
 */

export default function App({
  NotifyProps = {},
  RouterProps = {},
  SuspenseProps = {},
  ThemeProps = {},
  WrapperProps = { Children: [] }
}) {
  return (
    <Wrapper
      Children={[
        { Component: ThemeWrapper, ...ThemeProps },
        { Component: SuspenseWrapper, ...SuspenseProps },
        { Component: ErrorWrapper },
        { Component: NotifyWrapper, ...NotifyProps },
        ...WrapperProps.Children
      ]}
    >
      <RouterWrapper {...RouterProps} />
    </Wrapper>
  );
  // return (
  //   <ThemeWrapper {...ThemeProps}>
  //     <SuspenseWrapper {...SuspenseProps}>
  //       <ErrorWrapper>
  //         <NotifyWrapper {...NotifyProps}>
  //           <Wrapper {...WrapperProps}>
  //             <RouterWrapper {...RouterProps} />
  //           </Wrapper>
  //         </NotifyWrapper>
  //       </ErrorWrapper>
  //     </SuspenseWrapper>
  //   </ThemeWrapper>
  // );
}

App.propTypes = {
  NotifyProps: PropTypes.object,
  RouterProps: PropTypes.object,
  SuspenseProps: PropTypes.object,
  ThemeProps: PropTypes.object,
  WrapperProps: PropTypes.object
};
