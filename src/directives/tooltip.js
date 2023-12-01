/**
 * Description: Sử dụng custom directive để hiện tooltip
 * khi sử dụng cần thêm attribute v-tooltip.top="'Nội dung'"
 * vào element muốn hiện tooltip
 *
 */
const handleTooltip = (el, binding) => {
  try {
    el.setAttribute("data-tooltip", binding.value);
    el.classList.add("ms-tooltip");

    if (binding.modifiers.left) {
      el.classList.add("--left");
    } else if (binding.modifiers.right) {
      el.classList.add("--right");
    } else if (binding.modifiers.top) {
      el.classList.add("--top");
    } else {
      el.classList.add("--bottom");
    }
  } catch (error) {
    console.warn(error);
  }
};

export default handleTooltip;
