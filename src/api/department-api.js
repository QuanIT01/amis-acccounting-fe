import axiosClient from "./axios-client";

const rootUrl = "/Departments";

const departmentApi = {
  /**
   * Description: Lấy danh sách toàn bộ đơn vị
   */
  getAll() {
    const url = rootUrl;
    return axiosClient.get(url);
  },
};

export default departmentApi;
