import enums from "@/helper/enum";

/**
 * Description: Bẫy focus trong một form
 * làm cho con trỏ focus luôn chỉ chạy qua các input trong form hiện tại
 *
 */
const focusTrapDirective = (el) => {
  let inputElements = el.querySelectorAll("[tabindex]:not([tabindex='-1'])");

  // Sắp xếp tăng dần theo thứ tự tabindex
  inputElements = Array.from(inputElements).sort(
    (prev, next) => prev.getAttribute("tabindex") - next.getAttribute("tabindex")
  );

  // vị trí hiện tại của con trỏ
  let currentIndex = 0;

  // Gán sự kiện tab cho từng input
  Array.from(inputElements).forEach((input) => {
    input.onkeydown = (e) => {
      if (e.keyCode === enums.key.TAB) {
        if (e.shiftKey) {
          // Khi nhấn nút shift + tab
          // nhảy sang input trước đó
          if (currentIndex > 0) {
            currentIndex--;
          } else {
            currentIndex = inputElements.length - 1;
          }
        } else {
          // Khi nhấn nút tab
          // nhảy sang input tiếp theo
          if (currentIndex < inputElements.length - 1) {
            currentIndex++;
          } else {
            currentIndex = 0;
          }
        }

        // Focus vào vị trí hiện tại
        e.preventDefault();
        inputElements[currentIndex].focus();
      }
    };

    // Set lại index hiện tại sang index của input được click
    input.onclick = () => {
      currentIndex = input.getAttribute("tabindex") - 1;
    };
  });
};

export default focusTrapDirective;
