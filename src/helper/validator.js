/**
 * Description: Hàm validate input
 *
 */
export const validator = (input = { value: "", rules: [] }) => {
  try {
    let errorMsg = null;
    for (let rule of input.rules) {
      const message = rule.checker(input.value, rule.errorMsg);

      if (message) {
        errorMsg = message;
        break;
      }
    }

    return errorMsg;
  } catch (error) {
    console.warn(error);
    return "error";
  }
};

/**
 * Description: Hàm kiểm tra giá trị truyền vào
 * có giá trị hay không
 *
 */
export const required = (value, message) => {
  try {
    if (Array.isArray(value)) {
      return value.length ? null : message || "Vui lòng nhập trường này";
    } else {
      return value ? null : message || "Vui lòng nhập trường này";
    }
  } catch (error) {
    console.warn(error);
    return "error";
  }
};

/**
 * Description: Hàm kiểm tra giá trị truyền vào
 * có phải là định dạng của email hay không
 *
 */
export const email = (value, message) => {
  try {
    var regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return !value || regex.test(value) ? null : message || "Vui lòng nhập email";
  } catch (error) {
    console.warn(error);
    return "error";
  }
};

/**
 * Description: Hàm kiểm tra giá trị truyền vào
 * có độ dài lớn hơn giá trị min hay không
 *
 */
export const minLength = (value, min, message) => {
  return value.length >= min ? null : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
};

/**
 * Description: Hàm kiểm tra mã theo định dạng XX-1000 +
 *
 */
export const codeFormat = (value, message) => {
  try {
    var regex = /^[a-zA-Z]{1,}-[0-9]{4,}$/;

    return regex.test(value) ? null : message || "Mã không đúng định dạng";
  } catch (error) {
    console.warn(error);
  }
};

/**
 * Description: Hàm kiểm tra số điện thoại di động
 *
 */
export const mobilePhoneFormat = (value, message) => {
  try {
    var regex = /^0\d{9}$/;

    return !value || regex.test(value) ? null : message || "Số điện thoại không đúng định dạng";
  } catch (error) {
    console.warn(error);
  }
};
