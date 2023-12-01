/**
 *
 * Description: Generate date in format: DD/MM/YYYY
 */
function formatDate(dateString, format = "DD/MM/YYYY") {
  try {
    const dateObject = new Date(dateString);

    const data = {
      DD: dateObject.getDate(),
      MM: dateObject.getMonth() + 1,
      YYYY: dateObject.getFullYear(),
    };

    // Lấy ra ký tự phân cách
    const separationString = format.match(/[^\w\s]/g)[0];

    // Phân tích cú pháp
    const formatArr = format.split(separationString);

    // Chuyển đổi thành chuỗi theo cú pháp
    const formateDateString = formatArr
      .map((item) => {
        if (data[item] < 10) {
          return "0" + data[item];
        } else return data[item] + "";
      })
      .join(separationString);

    return formateDateString;
  } catch (error) {
    return "";
  }
}

export function formatDateString(dateString, format = "DD/MM/YYYY") {
  dateString = dateString.replace(/[^\w]/gi, "");

  const data = {
    DD: dateString.slice(0, 2) || "DD",
    MM: dateString.slice(2, 4) || "MM",
    YYYY: dateString.slice(4, 8) || "YYYY",
  };

  console.log(data, `${data.DD || "DD"}/${data.MM || "MM"}/${data.YYYY || "YYYY"}`);
}

export default formatDate;
