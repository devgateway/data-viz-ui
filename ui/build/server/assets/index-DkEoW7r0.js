import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { useState, useRef, useCallback, useImperativeHandle, useEffect } from "react";
import { Container, Grid, Form, TextArea, Button, Message, Label, Icon, Dropdown, Input } from "semantic-ui-react";
import { e as connect_default, i as sendShowCaseForm, r as reset } from "./server-build-C_g_IF5C.js";
import { useDropzone } from "react-dropzone";
import "node:stream";
import "@react-router/node";
import "react-router";
import "isbot";
import "react-dom/server";
import "use-sync-external-store/with-selector.js";
import "react-intl";
import "prop-types";
import "react-compiler-runtime";
import "react-dom/client";
import "immutable";
import "papaparse";
import "@devgateway/customizer";
import "@reduxjs/toolkit";
import "@artsy/fresnel";
import "clsx";
import "semantic-ui-react/dist/commonjs/lib/index.js";
import "query-string";
const COUNTRY_OPTIONS = [{ "text": "Afghanistan", "key": "AF", "value": "AF", "flag": "af" }, {
  "text": "Åland Islands",
  "key": "AX",
  "value": "AX",
  "flag": "ax"
}, { "text": "Albania", "key": "AL", "value": "AL", "flag": "al" }, {
  "text": "Algeria",
  "key": "DZ",
  "value": "DZ",
  "flag": "dz"
}, { "text": "American Samoa", "key": "AS", "value": "AS", "flag": "as" }, {
  "text": "Andorra",
  "key": "AD",
  "value": "AD",
  "flag": "ad"
}, { "text": "Angola", "key": "AO", "value": "AO", "flag": "ao" }, {
  "text": "Anguilla",
  "key": "AI",
  "value": "AI",
  "flag": "ai"
}, { "text": "Antarctica", "key": "AQ", "value": "AQ", "flag": "aq" }, {
  "text": "Antigua and Barbuda",
  "key": "AG",
  "value": "AG",
  "flag": "ag"
}, { "text": "Argentina", "key": "AR", "value": "AR", "flag": "ar" }, {
  "text": "Armenia",
  "key": "AM",
  "value": "AM",
  "flag": "am"
}, { "text": "Aruba", "key": "AW", "value": "AW", "flag": "aw" }, {
  "text": "Australia",
  "key": "AU",
  "value": "AU",
  "flag": "au"
}, { "text": "Austria", "key": "AT", "value": "AT", "flag": "at" }, {
  "text": "Azerbaijan",
  "key": "AZ",
  "value": "AZ",
  "flag": "az"
}, { "text": "Bahamas", "key": "BS", "value": "BS", "flag": "bs" }, {
  "text": "Bahrain",
  "key": "BH",
  "value": "BH",
  "flag": "bh"
}, { "text": "Bangladesh", "key": "BD", "value": "BD", "flag": "bd" }, {
  "text": "Barbados",
  "key": "BB",
  "value": "BB",
  "flag": "bb"
}, { "text": "Belarus", "key": "BY", "value": "BY", "flag": "by" }, {
  "text": "Belgium",
  "key": "BE",
  "value": "BE",
  "flag": "be"
}, { "text": "Belize", "key": "BZ", "value": "BZ", "flag": "bz" }, {
  "text": "Benin",
  "key": "BJ",
  "value": "BJ",
  "flag": "bj"
}, { "text": "Bermuda", "key": "BM", "value": "BM", "flag": "bm" }, {
  "text": "Bhutan",
  "key": "BT",
  "value": "BT",
  "flag": "bt"
}, {
  "text": "Bolivia, Plurinational State of",
  "key": "BO",
  "value": "BO",
  "flag": "bo"
}, {
  "text": "Bonaire, Sint Eustatius and Saba",
  "key": "BQ",
  "value": "BQ",
  "flag": "bq"
}, { "text": "Bosnia and Herzegovina", "key": "BA", "value": "BA", "flag": "ba" }, {
  "text": "Botswana",
  "key": "BW",
  "value": "BW",
  "flag": "bw"
}, { "text": "Bouvet Island", "key": "BV", "value": "BV", "flag": "bv" }, {
  "text": "Brazil",
  "key": "BR",
  "value": "BR",
  "flag": "br"
}, { "text": "British Indian Ocean Territory", "key": "IO", "value": "IO", "flag": "io" }, {
  "text": "Brunei Darussalam",
  "key": "BN",
  "value": "BN",
  "flag": "bn"
}, { "text": "Bulgaria", "key": "BG", "value": "BG", "flag": "bg" }, {
  "text": "Burkina Faso",
  "key": "BF",
  "value": "BF",
  "flag": "bf"
}, { "text": "Burundi", "key": "BI", "value": "BI", "flag": "bi" }, {
  "text": "Cambodia",
  "key": "KH",
  "value": "KH",
  "flag": "kh"
}, { "text": "Cameroon", "key": "CM", "value": "CM", "flag": "cm" }, {
  "text": "Canada",
  "key": "CA",
  "value": "CA",
  "flag": "ca"
}, { "text": "Cape Verde", "key": "CV", "value": "CV", "flag": "cv" }, {
  "text": "Cayman Islands",
  "key": "KY",
  "value": "KY",
  "flag": "ky"
}, { "text": "Central African Republic", "key": "CF", "value": "CF", "flag": "cf" }, {
  "text": "Chad",
  "key": "TD",
  "value": "TD",
  "flag": "td"
}, { "text": "Chile", "key": "CL", "value": "CL", "flag": "cl" }, {
  "text": "China",
  "key": "CN",
  "value": "CN",
  "flag": "cn"
}, { "text": "Christmas Island", "key": "CX", "value": "CX", "flag": "cx" }, {
  "text": "Cocos (Keeling) Islands",
  "key": "CC",
  "value": "CC",
  "flag": "cc"
}, { "text": "Colombia", "key": "CO", "value": "CO", "flag": "co" }, {
  "text": "Comoros",
  "key": "KM",
  "value": "KM",
  "flag": "km"
}, { "text": "Congo", "key": "CG", "value": "CG", "flag": "cg" }, {
  "text": "Congo, the Democratic Republic of the",
  "key": "CD",
  "value": "CD",
  "flag": "cd"
}, { "text": "Cook Islands", "key": "CK", "value": "CK", "flag": "ck" }, {
  "text": "Costa Rica",
  "key": "CR",
  "value": "CR",
  "flag": "cr"
}, { "text": "Côte d'Ivoire", "key": "CI", "value": "CI", "flag": "ci" }, {
  "text": "Croatia",
  "key": "HR",
  "value": "HR",
  "flag": "hr"
}, { "text": "Cuba", "key": "CU", "value": "CU", "flag": "cu" }, {
  "text": "Curaçao",
  "key": "CW",
  "value": "CW",
  "flag": "cw"
}, { "text": "Cyprus", "key": "CY", "value": "CY", "flag": "cy" }, {
  "text": "Czech Republic",
  "key": "CZ",
  "value": "CZ",
  "flag": "cz"
}, { "text": "Denmark", "key": "DK", "value": "DK", "flag": "dk" }, {
  "text": "Djibouti",
  "key": "DJ",
  "value": "DJ",
  "flag": "dj"
}, { "text": "Dominica", "key": "DM", "value": "DM", "flag": "dm" }, {
  "text": "Dominican Republic",
  "key": "DO",
  "value": "DO",
  "flag": "do"
}, { "text": "Ecuador", "key": "EC", "value": "EC", "flag": "ec" }, {
  "text": "Egypt",
  "key": "EG",
  "value": "EG",
  "flag": "eg"
}, { "text": "El Salvador", "key": "SV", "value": "SV", "flag": "sv" }, {
  "text": "Equatorial Guinea",
  "key": "GQ",
  "value": "GQ",
  "flag": "gq"
}, { "text": "Eritrea", "key": "ER", "value": "ER", "flag": "er" }, {
  "text": "Estonia",
  "key": "EE",
  "value": "EE",
  "flag": "ee"
}, { "text": "Ethiopia", "key": "ET", "value": "ET", "flag": "et" }, {
  "text": "Falkland Islands (Malvinas)",
  "key": "FK",
  "value": "FK",
  "flag": "fk"
}, { "text": "Faroe Islands", "key": "FO", "value": "FO", "flag": "fo" }, {
  "text": "Fiji",
  "key": "FJ",
  "value": "FJ",
  "flag": "fj"
}, { "text": "Finland", "key": "FI", "value": "FI", "flag": "fi" }, {
  "text": "France",
  "key": "FR",
  "value": "FR",
  "flag": "fr"
}, { "text": "French Guiana", "key": "GF", "value": "GF", "flag": "gf" }, {
  "text": "French Polynesia",
  "key": "PF",
  "value": "PF",
  "flag": "pf"
}, { "text": "French Southern Territories", "key": "TF", "value": "TF", "flag": "tf" }, {
  "text": "Gabon",
  "key": "GA",
  "value": "GA",
  "flag": "ga"
}, { "text": "Gambia", "key": "GM", "value": "GM", "flag": "gm" }, {
  "text": "Georgia",
  "key": "GE",
  "value": "GE",
  "flag": "ge"
}, { "text": "Germany", "key": "DE", "value": "DE", "flag": "de" }, {
  "text": "Ghana",
  "key": "GH",
  "value": "GH",
  "flag": "gh"
}, { "text": "Gibraltar", "key": "GI", "value": "GI", "flag": "gi" }, {
  "text": "Greece",
  "key": "GR",
  "value": "GR",
  "flag": "gr"
}, { "text": "Greenland", "key": "GL", "value": "GL", "flag": "gl" }, {
  "text": "Grenada",
  "key": "GD",
  "value": "GD",
  "flag": "gd"
}, { "text": "Guadeloupe", "key": "GP", "value": "GP", "flag": "gp" }, {
  "text": "Guam",
  "key": "GU",
  "value": "GU",
  "flag": "gu"
}, { "text": "Guatemala", "key": "GT", "value": "GT", "flag": "gt" }, {
  "text": "Guernsey",
  "key": "GG",
  "value": "GG",
  "flag": "gg"
}, { "text": "Guinea", "key": "GN", "value": "GN", "flag": "gn" }, {
  "text": "Guinea-Bissau",
  "key": "GW",
  "value": "GW",
  "flag": "gw"
}, { "text": "Guyana", "key": "GY", "value": "GY", "flag": "gy" }, {
  "text": "Haiti",
  "key": "HT",
  "value": "HT",
  "flag": "ht"
}, {
  "text": "Heard Island and McDonald Islands",
  "key": "HM",
  "value": "HM",
  "flag": "hm"
}, { "text": "Holy See (Vatican City State)", "key": "VA", "value": "VA", "flag": "va" }, {
  "text": "Honduras",
  "key": "HN",
  "value": "HN",
  "flag": "hn"
}, { "text": "Hong Kong", "key": "HK", "value": "HK", "flag": "hk" }, {
  "text": "Hungary",
  "key": "HU",
  "value": "HU",
  "flag": "hu"
}, { "text": "Iceland", "key": "IS", "value": "IS", "flag": "is" }, {
  "text": "India",
  "key": "IN",
  "value": "IN",
  "flag": "in"
}, { "text": "Indonesia", "key": "ID", "value": "ID", "flag": "id" }, {
  "text": "Iran, Islamic Republic of",
  "key": "IR",
  "value": "IR",
  "flag": "ir"
}, { "text": "Iraq", "key": "IQ", "value": "IQ", "flag": "iq" }, {
  "text": "Ireland",
  "key": "IE",
  "value": "IE",
  "flag": "ie"
}, { "text": "Isle of Man", "key": "IM", "value": "IM", "flag": "im" }, {
  "text": "Israel",
  "key": "IL",
  "value": "IL",
  "flag": "il"
}, { "text": "Italy", "key": "IT", "value": "IT", "flag": "it" }, {
  "text": "Jamaica",
  "key": "JM",
  "value": "JM",
  "flag": "jm"
}, { "text": "Japan", "key": "JP", "value": "JP", "flag": "jp" }, {
  "text": "Jersey",
  "key": "JE",
  "value": "JE",
  "flag": "je"
}, { "text": "Jordan", "key": "JO", "value": "JO", "flag": "jo" }, {
  "text": "Kazakhstan",
  "key": "KZ",
  "value": "KZ",
  "flag": "kz"
}, { "text": "Kenya", "key": "KE", "value": "KE", "flag": "ke" }, {
  "text": "Kiribati",
  "key": "KI",
  "value": "KI",
  "flag": "ki"
}, {
  "text": "Korea, Democratic People's Republic of",
  "key": "KP",
  "value": "KP",
  "flag": "kp"
}, { "text": "Korea, Republic of", "key": "KR", "value": "KR", "flag": "kr" }, {
  "text": "Kuwait",
  "key": "KW",
  "value": "KW",
  "flag": "kw"
}, { "text": "Kyrgyzstan", "key": "KG", "value": "KG", "flag": "kg" }, {
  "text": "Lao People's Democratic Republic",
  "key": "LA",
  "value": "LA",
  "flag": "la"
}, { "text": "Latvia", "key": "LV", "value": "LV", "flag": "lv" }, {
  "text": "Lebanon",
  "key": "LB",
  "value": "LB",
  "flag": "lb"
}, { "text": "Lesotho", "key": "LS", "value": "LS", "flag": "ls" }, {
  "text": "Liberia",
  "key": "LR",
  "value": "LR",
  "flag": "lr"
}, { "text": "Libya", "key": "LY", "value": "LY", "flag": "ly" }, {
  "text": "Liechtenstein",
  "key": "LI",
  "value": "LI",
  "flag": "li"
}, { "text": "Lithuania", "key": "LT", "value": "LT", "flag": "lt" }, {
  "text": "Luxembourg",
  "key": "LU",
  "value": "LU",
  "flag": "lu"
}, { "text": "Macao", "key": "MO", "value": "MO", "flag": "mo" }, {
  "text": "Macedonia, the Former Yugoslav Republic of",
  "key": "MK",
  "value": "MK",
  "flag": "mk"
}, { "text": "Madagascar", "key": "MG", "value": "MG", "flag": "mg" }, {
  "text": "Malawi",
  "key": "MW",
  "value": "MW",
  "flag": "mw"
}, { "text": "Malaysia", "key": "MY", "value": "MY", "flag": "my" }, {
  "text": "Maldives",
  "key": "MV",
  "value": "MV",
  "flag": "mv"
}, { "text": "Mali", "key": "ML", "value": "ML", "flag": "ml" }, {
  "text": "Malta",
  "key": "MT",
  "value": "MT",
  "flag": "mt"
}, { "text": "Marshall Islands", "key": "MH", "value": "MH", "flag": "mh" }, {
  "text": "Martinique",
  "key": "MQ",
  "value": "MQ",
  "flag": "mq"
}, { "text": "Mauritania", "key": "MR", "value": "MR", "flag": "mr" }, {
  "text": "Mauritius",
  "key": "MU",
  "value": "MU",
  "flag": "mu"
}, { "text": "Mayotte", "key": "YT", "value": "YT", "flag": "yt" }, {
  "text": "Mexico",
  "key": "MX",
  "value": "MX",
  "flag": "mx"
}, {
  "text": "Micronesia, Federated States of",
  "key": "FM",
  "value": "FM",
  "flag": "fm"
}, { "text": "Moldova, Republic of", "key": "MD", "value": "MD", "flag": "md" }, {
  "text": "Monaco",
  "key": "MC",
  "value": "MC",
  "flag": "mc"
}, { "text": "Mongolia", "key": "MN", "value": "MN", "flag": "mn" }, {
  "text": "Montenegro",
  "key": "ME",
  "value": "ME",
  "flag": "me"
}, { "text": "Montserrat", "key": "MS", "value": "MS", "flag": "ms" }, {
  "text": "Morocco",
  "key": "MA",
  "value": "MA",
  "flag": "ma"
}, { "text": "Mozambique", "key": "MZ", "value": "MZ", "flag": "mz" }, {
  "text": "Myanmar",
  "key": "MM",
  "value": "MM",
  "flag": "mm"
}, { "text": "Namibia", "key": "NA", "value": "NA", "flag": "na" }, {
  "text": "Nauru",
  "key": "NR",
  "value": "NR",
  "flag": "nr"
}, { "text": "Nepal", "key": "NP", "value": "NP", "flag": "np" }, {
  "text": "Netherlands",
  "key": "NL",
  "value": "NL",
  "flag": "nl"
}, { "text": "New Caledonia", "key": "NC", "value": "NC", "flag": "nc" }, {
  "text": "New Zealand",
  "key": "NZ",
  "value": "NZ",
  "flag": "nz"
}, { "text": "Nicaragua", "key": "NI", "value": "NI", "flag": "ni" }, {
  "text": "Niger",
  "key": "NE",
  "value": "NE",
  "flag": "ne"
}, { "text": "Nigeria", "key": "NG", "value": "NG", "flag": "ng" }, {
  "text": "Niue",
  "key": "NU",
  "value": "NU",
  "flag": "nu"
}, { "text": "Norfolk Island", "key": "NF", "value": "NF", "flag": "nf" }, {
  "text": "Northern Mariana Islands",
  "key": "MP",
  "value": "MP",
  "flag": "mp"
}, { "text": "Norway", "key": "NO", "value": "NO", "flag": "no" }, {
  "text": "Oman",
  "key": "OM",
  "value": "OM",
  "flag": "om"
}, { "text": "Pakistan", "key": "PK", "value": "PK", "flag": "pk" }, {
  "text": "Palau",
  "key": "PW",
  "value": "PW",
  "flag": "pw"
}, { "text": "Palestine, State of", "key": "PS", "value": "PS", "flag": "ps" }, {
  "text": "Panama",
  "key": "PA",
  "value": "PA",
  "flag": "pa"
}, { "text": "Papua New Guinea", "key": "PG", "value": "PG", "flag": "pg" }, {
  "text": "Paraguay",
  "key": "PY",
  "value": "PY",
  "flag": "py"
}, { "text": "Peru", "key": "PE", "value": "PE", "flag": "pe" }, {
  "text": "Philippines",
  "key": "PH",
  "value": "PH",
  "flag": "ph"
}, { "text": "Pitcairn", "key": "PN", "value": "PN", "flag": "pn" }, {
  "text": "Poland",
  "key": "PL",
  "value": "PL",
  "flag": "pl"
}, { "text": "Portugal", "key": "PT", "value": "PT", "flag": "pt" }, {
  "text": "Puerto Rico",
  "key": "PR",
  "value": "PR",
  "flag": "pr"
}, { "text": "Qatar", "key": "QA", "value": "QA", "flag": "qa" }, {
  "text": "Réunion",
  "key": "RE",
  "value": "RE",
  "flag": "re"
}, { "text": "Romania", "key": "RO", "value": "RO", "flag": "ro" }, {
  "text": "Russian Federation",
  "key": "RU",
  "value": "RU",
  "flag": "ru"
}, { "text": "Rwanda", "key": "RW", "value": "RW", "flag": "rw" }, {
  "text": "Saint Barthélemy",
  "key": "BL",
  "value": "BL",
  "flag": "bl"
}, {
  "text": "Saint Helena, Ascension and Tristan da Cunha",
  "key": "SH",
  "value": "SH",
  "flag": "sh"
}, { "text": "Saint Kitts and Nevis", "key": "KN", "value": "KN", "flag": "kn" }, {
  "text": "Saint Lucia",
  "key": "LC",
  "value": "LC",
  "flag": "lc"
}, {
  "text": "Saint Martin (French part)",
  "key": "MF",
  "value": "MF",
  "flag": "mf"
}, {
  "text": "Saint Pierre and Miquelon",
  "key": "PM",
  "value": "PM",
  "flag": "pm"
}, { "text": "Saint Vincent and the Grenadines", "key": "VC", "value": "VC", "flag": "vc" }, {
  "text": "Samoa",
  "key": "WS",
  "value": "WS",
  "flag": "ws"
}, { "text": "San Marino", "key": "SM", "value": "SM", "flag": "sm" }, {
  "text": "Sao Tome and Principe",
  "key": "ST",
  "value": "ST",
  "flag": "st"
}, { "text": "Saudi Arabia", "key": "SA", "value": "SA", "flag": "sa" }, {
  "text": "Senegal",
  "key": "SN",
  "value": "SN",
  "flag": "sn"
}, { "text": "Serbia", "key": "RS", "value": "RS", "flag": "rs" }, {
  "text": "Seychelles",
  "key": "SC",
  "value": "SC",
  "flag": "sc"
}, { "text": "Sierra Leone", "key": "SL", "value": "SL", "flag": "sl" }, {
  "text": "Singapore",
  "key": "SG",
  "value": "SG",
  "flag": "sg"
}, { "text": "Sint Maarten (Dutch part)", "key": "SX", "value": "SX", "flag": "sx" }, {
  "text": "Slovakia",
  "key": "SK",
  "value": "SK",
  "flag": "sk"
}, { "text": "Slovenia", "key": "SI", "value": "SI", "flag": "si" }, {
  "text": "Solomon Islands",
  "key": "SB",
  "value": "SB",
  "flag": "sb"
}, { "text": "Somalia", "key": "SO", "value": "SO", "flag": "so" }, {
  "text": "South Africa",
  "key": "ZA",
  "value": "ZA",
  "flag": "za"
}, {
  "text": "South Georgia and the South Sandwich Islands",
  "key": "GS",
  "value": "GS",
  "flag": "gs"
}, { "text": "South Sudan", "key": "SS", "value": "SS", "flag": "ss" }, {
  "text": "Spain",
  "key": "ES",
  "value": "ES",
  "flag": "es"
}, { "text": "Sri Lanka", "key": "LK", "value": "LK", "flag": "lk" }, {
  "text": "Sudan",
  "key": "SD",
  "value": "SD",
  "flag": "sd"
}, { "text": "Suriname", "key": "SR", "value": "SR", "flag": "sr" }, {
  "text": "Svalbard and Jan Mayen",
  "key": "SJ",
  "value": "SJ",
  "flag": "sj"
}, { "text": "Swaziland", "key": "SZ", "value": "SZ", "flag": "sz" }, {
  "text": "Sweden",
  "key": "SE",
  "value": "SE",
  "flag": "se"
}, { "text": "Switzerland", "key": "CH", "value": "CH", "flag": "ch" }, {
  "text": "Syrian Arab Republic",
  "key": "SY",
  "value": "SY",
  "flag": "sy"
}, { "text": "Taiwan, Province of China", "key": "TW", "value": "TW", "flag": "tw" }, {
  "text": "Tajikistan",
  "key": "TJ",
  "value": "TJ",
  "flag": "tj"
}, { "text": "Tanzania, United Republic of", "key": "TZ", "value": "TZ", "flag": "tz" }, {
  "text": "Thailand",
  "key": "TH",
  "value": "TH",
  "flag": "th"
}, { "text": "Timor-Leste", "key": "TL", "value": "TL", "flag": "tl" }, {
  "text": "Togo",
  "key": "TG",
  "value": "TG",
  "flag": "tg"
}, { "text": "Tokelau", "key": "TK", "value": "TK", "flag": "tk" }, {
  "text": "Tonga",
  "key": "TO",
  "value": "TO",
  "flag": "to"
}, { "text": "Trinidad and Tobago", "key": "TT", "value": "TT", "flag": "tt" }, {
  "text": "Tunisia",
  "key": "TN",
  "value": "TN",
  "flag": "tn"
}, { "text": "Turkey", "key": "TR", "value": "TR", "flag": "tr" }, {
  "text": "Turkmenistan",
  "key": "TM",
  "value": "TM",
  "flag": "tm"
}, { "text": "Turks and Caicos Islands", "key": "TC", "value": "TC", "flag": "tc" }, {
  "text": "Tuvalu",
  "key": "TV",
  "value": "TV",
  "flag": "tv"
}, { "text": "Uganda", "key": "UG", "value": "UG", "flag": "ug" }, {
  "text": "Ukraine",
  "key": "UA",
  "value": "UA",
  "flag": "ua"
}, { "text": "United Arab Emirates", "key": "AE", "value": "AE", "flag": "ae" }, {
  "text": "United Kingdom",
  "key": "GB",
  "value": "GB",
  "flag": "gb"
}, { "text": "United States", "key": "US", "value": "US", "flag": "us" }, {
  "text": "United States Minor Outlying Islands",
  "key": "UM",
  "value": "UM",
  "flag": "um"
}, { "text": "Uruguay", "key": "UY", "value": "UY", "flag": "uy" }, {
  "text": "Uzbekistan",
  "key": "UZ",
  "value": "UZ",
  "flag": "uz"
}, { "text": "Vanuatu", "key": "VU", "value": "VU", "flag": "vu" }, {
  "text": "Venezuela, Bolivarian Republic of",
  "key": "VE",
  "value": "VE",
  "flag": "ve"
}, { "text": "Viet Nam", "key": "VN", "value": "VN", "flag": "vn" }, {
  "text": "Virgin Islands, British",
  "key": "VG",
  "value": "VG",
  "flag": "vg"
}, { "text": "Virgin Islands, U.S.", "key": "VI", "value": "VI", "flag": "vi" }, {
  "text": "Wallis and Futuna",
  "key": "WF",
  "value": "WF",
  "flag": "wf"
}, { "text": "Western Sahara", "key": "EH", "value": "EH", "flag": "eh" }, {
  "text": "Yemen",
  "key": "YE",
  "value": "YE",
  "flag": "ye"
}, { "text": "Zambia", "key": "ZM", "value": "ZM", "flag": "zm" }, {
  "text": "Zimbabwe",
  "key": "ZW",
  "value": "ZW",
  "flag": "zw"
}];
const maxUploadFileSize = 10;
const configData = {
  maxUploadFileSize
};
const options = COUNTRY_OPTIONS.map((c) => {
  return {
    flag: c.flag.toLocaleLowerCase(),
    value: c.text,
    text: c.text
  };
});
React__default.createRef();
function FileUploader({ onSelectionChange, showValidation, inputRef, name }) {
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const onDrop = useCallback((acceptedFiles2) => {
    setFiles([...files, ...acceptedFiles2]);
    setErrors([]);
  }, [files]);
  const onDropRejected = useCallback((rejectedFiles) => {
    setErrors([...rejectedFiles]);
  }, [files]);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    open
  } = useDropzone({ accept: "application/pdf,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.rtf,.html,.zip,.mp3,.wma,.mpg,.flv,.avi,.jpg,.jpeg,.png,.gif", maxFiles: 5, multiple: true, onDrop, onDropRejected });
  useImperativeHandle(inputRef, () => ({
    name,
    reset: () => {
      setFiles([]);
    },
    hasErrors: () => files.length == 0,
    value: () => files
  }));
  const remove = (file) => {
    const newFiles = [...files];
    newFiles.splice(file, 1);
    setFiles(newFiles);
  };
  const hasErrors = files.length === 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    errors && errors[0] && errors[0].errors && /* @__PURE__ */ jsx(Container, { fluid: true, className: `upload files ${hasErrors ? "error" : ""}`, children: /* @__PURE__ */ jsx("div", { className: "error-messages", children: /* @__PURE__ */ jsx("ul", { style: {}, children: errors[0].errors.map((e, index2) => {
      return /* @__PURE__ */ jsx("li", { children: "File type not allowed. File type must be - application/-pdf,.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.rtf,.html,.zip,.mp3,.wma,.mpg,.flv,.avi,.jpg,.jpeg,.png,.gif " }, index2);
    }) }) }) }),
    /* @__PURE__ */ jsxs(Container, { fluid: true, className: `upload files`, children: [
      /* @__PURE__ */ jsxs("div", { ...getRootProps({ className: "dropzone" }), children: [
        /* @__PURE__ */ jsx("input", { ...getInputProps() }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Drag 'n' drop files here, or click select button to select files. The maximum file size allowed is ",
          configData.maxUploadFileSize,
          "MB."
        ] }),
        files.length > 0 ? /* @__PURE__ */ jsx("ul", { children: files.map((f, i) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx(Label, { color: "green", icon: "file", children: f.name }),
          /* @__PURE__ */ jsx(Icon, { color: "red", name: "remove", size: "large", onClick: (e) => {
            e.stopPropagation();
            remove(i);
          } })
        ] }, i)) }) : null
      ] }),
      /* @__PURE__ */ jsx(Button, { secondary: true, onClick: open, children: "Select" })
    ] })
  ] });
}
const ValidatedDropDown = ({ options: options2, placeholder, name, required, showValidation, icon, inputRef }) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(true);
  useEffect(() => {
    if (required && value == null) {
      setError(true);
    } else {
      setError(false);
    }
  }, [value]);
  useImperativeHandle(inputRef, () => ({
    name,
    reset: () => {
      setValue(null);
    },
    value: () => value,
    hasErrors: () => {
      console.log(error);
      return error;
    }
  }));
  return /* @__PURE__ */ jsx(
    Dropdown,
    {
      value,
      error: error && showValidation,
      name,
      onChange: (e, value2) => {
        setValue(value2.value);
      },
      fluid: true,
      multiple: false,
      search: true,
      selection: true,
      options: options2,
      placeholder
    }
  );
};
const ValidatedField = ({ placeholder, name, icon, required, pattern, as, inputRef, showValidation }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(true);
  useEffect(() => {
    if (required && value.trim() == "" || pattern && !pattern.test(value)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [value]);
  useImperativeHandle(inputRef, () => ({
    name,
    reset: () => {
      setValue("");
    },
    hasErrors: () => error,
    value: () => value
  }));
  const C = as ? as : Input;
  return /* @__PURE__ */ jsx(
    C,
    {
      value,
      error: error && showValidation,
      onChange: (e) => setValue(e.target.value),
      name,
      icon,
      iconPosition: "left",
      placeholder
    }
  );
};
const Index = (props) => {
  const [state, setState] = useState({});
  useRef();
  const inputs = useRef({});
  const submitForm = (e) => {
    const elements = Object.keys(inputs.current).map((k) => inputs.current[k]);
    const hasErrors = elements.map((e2) => e2.hasErrors()).reduce((a, b) => a || b);
    state.files;
    if (hasErrors) {
      setState((prevState) => ({ ...prevState, showValidation: true }));
    } else {
      const values = {};
      elements.forEach((e2) => values[e2.name] = e2.value());
      props.onSubmit(values);
      setTimeout(() => {
        reset2();
      }, 5e3);
    }
  };
  const reset2 = () => {
    const elements = Object.keys(inputs.current).map((k) => inputs.current[k]);
    elements.forEach((e) => {
      e.reset();
    });
    setState({ showValidation: false, status: null });
    props.onReset();
  };
  const setInput = (el) => {
    if (el) {
      inputs.current[el.name] = el;
    }
  };
  const {
    status,
    organization = "Organization",
    name = "Name",
    email = "Email",
    country = "Country",
    message = "Message",
    resetlabel = "Reset",
    submitlabel = "Submit",
    successmessage = "Thanks for submitting your data",
    failuremessage = "Something didn't go well, please try again later",
    editing
  } = props;
  const { showValidation, token, reset: resetState } = state;
  return /* @__PURE__ */ jsx(Container, { fluid: true, className: "viz showcase", children: /* @__PURE__ */ jsxs(Grid, { columns: 1, className: showValidation ? "validated" : "", children: [
    /* @__PURE__ */ jsx(Grid.Column, { children: /* @__PURE__ */ jsx(
      ValidatedField,
      {
        inputRef: (el) => setInput(el),
        showValidation,
        required: true,
        icon: "building",
        name: "organization",
        placeholder: organization
      }
    ) }),
    /* @__PURE__ */ jsx(Grid.Column, { children: /* @__PURE__ */ jsx(
      ValidatedField,
      {
        inputRef: (el) => setInput(el),
        showValidation,
        required: true,
        icon: "user",
        name: "name",
        placeholder: name
      }
    ) }),
    /* @__PURE__ */ jsx(Grid.Column, { children: /* @__PURE__ */ jsx(
      ValidatedField,
      {
        inputRef: (el) => setInput(el),
        showValidation,
        required: true,
        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        icon: "envelope",
        placeholder: email,
        name: "email"
      }
    ) }),
    /* @__PURE__ */ jsx(Grid.Column, { children: /* @__PURE__ */ jsx(Form.Field, { children: /* @__PURE__ */ jsx(
      ValidatedDropDown,
      {
        inputRef: (el) => setInput(el),
        showValidation,
        name: "country",
        required: true,
        options,
        placeholder: country
      }
    ) }) }),
    /* @__PURE__ */ jsx(Grid.Column, { children: /* @__PURE__ */ jsx(
      FileUploader,
      {
        inputRef: (el) => setInput(el),
        showValidation,
        name: "files"
      }
    ) }),
    /* @__PURE__ */ jsx(Grid.Column, { children: /* @__PURE__ */ jsx(
      ValidatedField,
      {
        inputRef: (el) => setInput(el),
        placeholder: message,
        name: "message",
        as: TextArea
      }
    ) }),
    /* @__PURE__ */ jsxs(Grid.Row, { children: [
      /* @__PURE__ */ jsxs(Grid.Column, { textAlign: "left", width: 12, verticalAlign: "bottom", className: "form-buttons", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "btn-reset",
            onClick: (e) => reset2(),
            children: resetlabel
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            secondary: true,
            onClick: (e) => submitForm(),
            children: submitlabel
          }
        )
      ] }),
      (status == "OK" || editing) && /* @__PURE__ */ jsxs(Grid.Column, { width: 16, children: [
        " ",
        /* @__PURE__ */ jsx(
          Message,
          {
            success: true,
            content: /* @__PURE__ */ jsx("p", { children: successmessage })
          }
        )
      ] }),
      (status == "ERROR" || editing) && /* @__PURE__ */ jsxs(Grid.Column, { width: 16, children: [
        " ",
        /* @__PURE__ */ jsx(Message, { negative: true, children: /* @__PURE__ */ jsx("p", { children: failuremessage }) })
      ] })
    ] })
  ] }) });
};
const mapStateToProps = (state, ownProps) => {
  return {
    status: state.getIn(["embeddable", "showCase", "status"])
  };
};
const mapActionCreators = {
  onSubmit: sendShowCaseForm,
  onReset: reset
};
const index = connect_default(mapStateToProps, mapActionCreators)(Index);
export {
  index as default
};
