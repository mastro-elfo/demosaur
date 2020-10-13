#!/usr/bin/env bash

SCRIPT="`realpath "$0"`";
FILEPATH="$1";
DIRPATH=""
PAGE=`basename "$1" | cut -d "." -f 1`;

sed -n "/^## page/,/^## \/page/p" "$SCRIPT" | grep "^# \|^#$" | cut -d "#" -f 2- | cut -d " " -f 2- | sed "s/<page>/$PAGE/g" > "$FILEPATH"


## page
# import React, { createContext, useContext, useState } from "react";
#
# const Context = createContext();
#
# export function use<page>() {
#   return useContext(Context);
# }
#
# export default function <page>Provider({ children, defaultValue }) {
#   const value = useState(defaultValue);
#   return <Context.Provider value={value}>{children}</Context.Provider>;
# }
## /page
