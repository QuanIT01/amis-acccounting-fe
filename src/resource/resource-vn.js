const resourceVn = {
  Language: "Tiếng Việt",
  LanguageCode: "vi-VN",
  Product: "Kế toán",
  FullProductName: "AMIS Kế toán",
  Company: "Công ty Cổ phần MISA",

  ErrorMessage: {
    1000: "Thông tin nhập liệu không hợp lệ",
    1001: "Không tìm thấy tài nguyên",
    1002: "Mã đã tồn tại",
    1003: "Lỗi hệ thống, vui lòng thử lại sau",
  },

  Sidebar: {
    Dashboard: "Tổng quan",
    Employee: "Nhân viên",
    Cash: "Tiền mặt",
    Purchase: "Mua hàng",
    Sell: "Bán hàng",
    InvoiceManagement: "Quản lý hoá đơn",
    Warehouse: "Kho",
    Tax: "Thuế",
    Report: "Báo cáo",
    Collapse: "Thu gọn",
  },

  UserMenu: {
    ChangePassword: "Đổi mật khẩu",
    AccountSettings: "Thiết lập tài khoản",
    SecuritySettings: "Thiết lập bảo mật",
    LicenseAndPayment: "Giấy phép & Thanh toán",
    ReferralsEarnPoints: "Giới thiệu - Tích điểm",
    Language: "Ngôn ngữ",
    SignOut: "Đăng xuất",
  },

  Gender: {
    Male: "Nam",
    Female: "Nữ",
    Other: "Khác",
  },

  Button: {
    Save: "Cất",
    SaveS: "Lưu",
    SaveAndContinue: "Cất và thêm",
    Cancel: "Huỷ",
    OK: "Đồng ý",
    UnChecked: "Bỏ chọn",
    Delete: "Xoá",
    Update: "Sửa",
    RestoreDefault: "Lấy lại mặc định",
  },

  Table: {
    Functions: "Chức năng",
    CustomTableTitle: "Tuỳ chỉnh cột",
  },

  ContextMenu: {
    Duplicate: "Nhân bản",
    Delete: "Xoá",
    StopUsing: "Ngừng sử dụng",
    ExportAllToExcel: "Xuất tất cả",
    ExportListToExcel: "Xuất các dòng được chọn",
    ImportFromExcel: "Nhập từ Excel",
    DownloadSampleFile: "Tải tệp mẫu",
  },

  Combobox: {
    PlaceHolder: "Chọn giá trị",
  },

  PlaceHolder: {
    SelectAValue: "Chọn giá trị",
    Search: "Tìm kiếm",
  },

  Paging: {
    TotalRecords: "Tổng",
    ItemsPerPage: "Số bản ghi/trang",
    Records: "Bản ghi",
    NextPage: "Trang Sau",
    PrevPage: "Trang Trước",
  },

  Dialog: {
    ErrorTitle: "Đã có lỗi",
  },

  Popup: {},

  Toast: {
    Success: "Thành công!",
    Error: "Lỗi!",
    Warning: "Cảnh báo!",
    Info: "Thông tin!",
  },

  Tooltip: {
    Reload: "Tải lại",
    Notification: "Thông báo",
    Account: "Tài khoản",
    Close: "Đóng",
  },

  Text: {
    Selected: "Đã chọn",
  },

  Month: {
    M1: "Tháng 1",
    M2: "Tháng 2",
    M3: "Tháng 3",
    M4: "Tháng 4",
    M5: "Tháng 5",
    M6: "Tháng 6",
    M7: "Tháng 7",
    M8: "Tháng 8",
    M9: "Tháng 9",
    M10: "Tháng 10",
    M11: "Tháng 11",
    M12: "Tháng 12",
  },

  Day: {
    Today: "Hôm nay",
    Mo: "T2",
    Tu: "T3",
    We: "T4",
    Th: "T5",
    Fr: "T6",
    Sa: "T7",
    Su: "CN",
  },

  Page: {
    Employee: {
      Title: "Nhân viên",
      AddButton: "Thêm mới nhân viên",
      SearchPlaceholder: "Tìm theo mã, tên nhân viên",
      Form: {
        CreateTitle: "Thêm nhân viên",
        UpdateTitle: "Sửa nhân viên",
      },
      Toast: {
        CreateSuccess: "Thêm nhân viên thành công",
        UpdateSuccess: "Cập nhật nhân viên thành công",
        DeleteSuccess: "Xoá nhân viên thành công",
        DuplicateSuccess: "Nhân bản nhân viên thành công",
      },
      Dialog: {
        DeleteConfirmTitle: "Xoá nhân viên",
        DeleteConfirmDesc: (name) =>
          `Xoá nhân viên "${name}". Nhân viên sau khi xoá sẽ không thể khôi phục lại được`,
        MultipleDeleteConfirmDesc: (count) =>
          `Xoá ${count} nhân viên. Nhân viên sau khi xoá sẽ không thể khôi phục lại được`,
      },
      Validate: {
        EmployeeCode: "Mã không được để trống",
        FullName: "Tên không được để trống",
        Department: "Đơn vị không được để trống",
        CodeFormat: "Mã phải có dạng XX-1000 +",
        EmailFormat: "Email không đúng định dạng",
        MobilePhoneFormat: "ĐT di động không đúng định dạng",
      },

      EmployeeCode: {
        Title: "Mã",
        SubTitle: "Mã nhân viên",
        Desc: "Mã",
      },
      FullName: {
        Title: "Tên",
        SubTitle: "Tên nhân viên",
        Desc: "Tên",
      },
      Department: {
        Title: "Đơn vị",
        Desc: "Đơn vị",
      },
      Position: {
        Title: "Chức danh",
        Desc: "Chức danh",
      },
      DateOfBirth: {
        Title: "Ngày sinh",
        Desc: "Ngày sinh",
      },
      Gender: {
        Title: "Giới tính",
        Desc: "Giới tính",
      },
      IdentityNumber: {
        Title: "Số CMND",
        Desc: "Số Chứng minh nhân dân",
      },
      IdentityDate: {
        Title: "Ngày cấp",
        Desc: "Ngày cấp",
      },
      IdentityPlace: {
        Title: "Nơi cấp",
        Desc: "Nơi cấp",
      },
      IsCustomer: {
        Title: "Là khách hàng",
        Desc: "Là khách hàng",
      },
      IsSupplier: {
        Title: "Là nhà cung cấp",
        Desc: "Là nhà cung cấp",
      },
      Address: {
        Title: "Địa chỉ",
        Desc: "Địa chỉ",
      },
      MobilePhone: {
        Title: "ĐT di động",
        Desc: "Điện thoại di động",
      },
      LandlinePhone: {
        Title: "ĐT cố định",
        Desc: "Điện thoại cố định",
      },
      Email: {
        Title: "Email",
        Desc: "Email",
      },
      BankAccount: {
        Title: "Tài khoản ngân hàng",
        SubTitle: "Số tài khoản",
        Desc: "Tài khoản ngân hàng",
      },
      BankName: {
        Title: "Tên ngân hàng",
        Desc: "Tên ngân hàng",
      },
      BankBranch: {
        Title: "Chi nhánh",
        SubTitle: "Chi nhánh TK ngân hàng",
        Desc: "Chi nhánh tài khoản ngân hàng",
      },
    },
  },
};

export default resourceVn;
