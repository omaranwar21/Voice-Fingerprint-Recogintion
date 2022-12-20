"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Button = _styledComponents["default"].button.withConfig({
  displayName: "record-button__Button",
  componentId: "sc-1n5amwk-0"
})(["background:", ";color:", ";border-radius:50%;width:64px;height:64px;background:rgba(227,73,28,0.8);outline:none;border:none;cursor:pointer;z-index:5;:hover{background:#fb6d42;}"], function (props) {
  return props.backgroundColor;
}, function (props) {
  return props.color;
});

var RecWrapper = _styledComponents["default"].div.withConfig({
  displayName: "record-button__RecWrapper",
  componentId: "sc-1n5amwk-1"
})(["display:flex;flex-direction:column;align-items:center;"]);

var ButtonBorder = _styledComponents["default"].div.withConfig({
  displayName: "record-button__ButtonBorder",
  componentId: "sc-1n5amwk-2"
})(["border:8px solid rgba(255,255,255,0.4);height:80px;width:80px;border-radius:50%;"]);

var Instructions = _styledComponents["default"].div.withConfig({
  displayName: "record-button__Instructions",
  componentId: "sc-1n5amwk-3"
})(["font-family:Arial;font-size:14px;color:#ffffff;letter-spacing:1.75px;display:flex;margin-bottom:20px;"]);

var InstuctionsHighlight = _styledComponents["default"].div.withConfig({
  displayName: "record-button__InstuctionsHighlight",
  componentId: "sc-1n5amwk-4"
})(["font-weight:700;color:#dc6547;padding:0 5px;"]);

Button.defaultProps = {
  color: 'black',
  backgroundColor: 'white'
};

var RecordButton = function RecordButton(_ref) {
  var t = _ref.t,
      props = _objectWithoutProperties(_ref, ["t"]);

  return /*#__PURE__*/_react["default"].createElement(RecWrapper, null, /*#__PURE__*/_react["default"].createElement(Instructions, null, /*#__PURE__*/_react["default"].createElement("div", null, t('PRESS'), " "), /*#__PURE__*/_react["default"].createElement(InstuctionsHighlight, null, " ", t('REC'), " "), t('WHEN READY')), /*#__PURE__*/_react["default"].createElement(ButtonBorder, null, /*#__PURE__*/_react["default"].createElement(Button, props)));
};

RecordButton.propTypes = {
  t: _propTypes["default"].func
};
var _default = RecordButton;
exports["default"] = _default;