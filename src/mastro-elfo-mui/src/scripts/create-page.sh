#!/usr/bin/env bash

SCRIPT="`realpath "$0"`";
FILEPATH="$1";
PAGE=`basename "$1" | cut -d "." -f 1`;

sed -n "/^## page/,/^## \/page/p" "$SCRIPT" | grep "^# \|^#$" | cut -d "#" -f 2- | cut -d " " -f 2- | sed "s/<page>/$PAGE/g" > "$FILEPATH"


## page
# import React from "react";
# import { BackIconButton, Content, Header, Page } from "../mastro-elfo-mui/";
# import BrokenImageIcon from "@material-ui/icons/BrokenImage";
#
# function Component() {
#   return (
#     <Page
#       header={<Header LeftAction={<BackIconButton />}><page></Header>}
#       content={<Content><page></Content>}
#     />
#   );
# }
#
# export const route = {
#   path: "/<page>",
#   exact: true,
#   component: Component
# };
#
# export const drawer = {
#   key: "<page>",
#   primary: "<page>",
#   secondary: "",
#   icon: <BrokenImageIcon/>,
#   title: "<page>"
# }
## /page
