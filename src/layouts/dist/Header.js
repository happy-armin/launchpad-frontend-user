"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var HamburgerMenu_1 = require("../components/HamburgerMenu");
var ConnectWallet_1 = require("../components/ConnectWallet");
require("../styles/layouts/header.scss");
function Header() {
    var _a = react_1.useState(false), isScrolled = _a[0], setIsScrolled = _a[1];
    var handleScroll = function () {
        var currentScrollY = window.scrollY;
        if (currentScrollY > 0) {
            setIsScrolled(true);
        }
        else {
            setIsScrolled(false);
        }
    };
    react_1.useEffect(function () {
        window.addEventListener('scroll', handleScroll);
        return function () {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (react_1["default"].createElement("header", { className: "header " + (isScrolled ? 'is-sticky' : '') },
        react_1["default"].createElement(react_router_dom_1.Link, { to: "/", className: "header__logo" }, "LaunchPad"),
        react_1["default"].createElement("div", { className: "header-right-bar" },
            react_1["default"].createElement(ConnectWallet_1["default"], null),
            react_1["default"].createElement("nav", { className: "header__nav" },
                react_1["default"].createElement("ul", null,
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/create" }, "Create Pool")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/pools" }, "IDOs")),
                    react_1["default"].createElement("li", null,
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/block" }, "Block List"))))),
        react_1["default"].createElement(HamburgerMenu_1["default"], null)));
}
exports["default"] = Header;
