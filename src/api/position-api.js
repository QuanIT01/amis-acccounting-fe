import axiosClient from "./axios-client";

const rootUrl = "/Positions";

const positionApi = {
  /**
   * Description: Lấy danh sách toàn bộ vị trí
   */
  getAll() {
    const url = rootUrl;
    return axiosClient.get(url);
  },
};

export default positionApi;
