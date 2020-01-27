const NUMBER_REGEX = /^-?[0-9]\d*(\.\d+)?$/;
const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/; // eslint-disable-line
export default{
  isNotEmpty: (value) => !!value,
  isNumber: (value) => NUMBER_REGEX.test(value),
  isUrl: (value) => URL_REGEX.test(value),
}