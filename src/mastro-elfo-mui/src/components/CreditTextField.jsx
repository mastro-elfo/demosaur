/**
 * Creates a TextField to input a credit card number
 *
 * Any non digit character is removed from input value. Value is also split into 4-length pieces for readability.
 *
 * `validate` is a function that takes the card number (all non digit characters removed) and returns an object that is spread to TextField. For example override `error` and `helperText` to give feedback to the user.
 * `others` props are passed to TextField.
 *
 * Why should I provide a validation function?
 * See https://en.wikipedia.org/wiki/Payment_card_number and https://web.archive.org/web/20180908155112/https://creditcardjs.com/credit-card-type-detection
 */

import React from "react";

import { InputAdornment, TextField } from "@material-ui/core";

import CreditCardIcon from "@material-ui/icons/CreditCard";

/**
 * Creates a TextField to input a credit card number
 *
 * Any non digit character is removed from input value. Value is also split into 4-length pieces for readability.
 *
 * `validate` is a function that takes the card number (all non digit characters removed) and returns an object that is spread to TextField. For example override `error` and `helperText` to give feedback to the user.
 * `others` props are passed to TextField.
 *
 * Why should I provide a validation function?
 * See https://en.wikipedia.org/wiki/Payment_card_number and https://web.archive.org/web/20180908155112/https://creditcardjs.com/credit-card-type-detection
 * @param  {String} [value=""]   [description]
 * @param  {[type]} [validate=(] [description]
 * @return {[type]}              [description]
 */

export default function({ value = "", validate = () => ({}), ...others }) {
  // Remove non digit characters from value
  const innerValue = value.replace(/[^\d]/g, "");
  // Split innerValue into 4-length pieces
  const pieces = (innerValue.match(/.{0,4}/g) || []).filter(i => !!i);

  return (
    <TextField
      value={pieces.join(" ")}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <CreditCardIcon />
          </InputAdornment>
        )
      }}
      {...validate(innerValue)}
      {...others}
    />
  );
}
