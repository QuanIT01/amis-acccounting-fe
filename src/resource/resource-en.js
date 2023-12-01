const resourceEn = {
  Language: "English",
  LanguageCode: "en-US",
  Product: "Accounting",
  FullProductName: "AMIS Accounting",
  Company: "MISA Joint Stock Company",

  ErrorMessage: {
    1000: "Invalid data input",
    1001: "Resource not found",
    1002: "The code already exists",
    1003: "System error, please try again later",
  },

  Sidebar: {
    Dashboard: "Dashboard",
    Employee: "Employee",
    Cash: "Cash",
    Purchase: "Purchase",
    Sell: "Sell",
    InvoiceManagement: "Invoice",
    Warehouse: "Warehouse",
    Tax: "Tax",
    Report: "Report",
    Collapse: "Collapse",
  },

  UserMenu: {
    ChangePassword: "Change password",
    AccountSettings: "Account settings",
    SecuritySettings: "Security settings",
    LicenseAndPayment: "License & Payment",
    ReferralsEarnPoints: "Referrals - Earn points",
    Language: "Language",
    SignOut: "Sign out",
  },

  Gender: {
    Male: "Male",
    Female: "Female",
    Other: "Other",
  },

  Button: {
    Save: "Save",
    SaveS: "Save",
    SaveAndContinue: "Save and continue",
    Cancel: "Cancel",
    OK: "OK",
    UnChecked: "Uncheck",
    Delete: "Delete",
    Update: "Edit",
    RestoreDefault: "Restore default",
  },

  Table: {
    Functions: "Functions",
    CustomTableTitle: "Customize columns",
  },

  ContextMenu: {
    Duplicate: "Duplicate",
    Delete: "Delete",
    StopUsing: "Stop Using",
    ExportAllToExcel: "Export all",
    ExportListToExcel: "Export selected records",
    ImportFromExcel: "Import from Excel",
    DownloadSampleFile: "Download sample",
  },

  Combobox: {
    PlaceHolder: "Select a value",
  },

  PlaceHolder: {
    SelectAValue: "Select a value",
    Search: "Search",
  },

  Paging: {
    TotalRecords: "Total",
    ItemsPerPage: "Records per page",
    Records: "Records",
    NextPage: "Next Page",
    PrevPage: "Previous Page",
  },

  Dialog: {
    ErrorTitle: "Error",
  },

  Popup: {},

  Toast: {
    Success: "Success!",
    Error: "Error!",
    Warning: "Warning!",
    Info: "Information!",
  },

  Tooltip: {
    Reload: "Reload",
    Notification: "Notification",
    Account: "Account",
    Close: "Close",
  },

  Text: {
    Selected: "Selected",
  },

  Month: {
    M1: "January",
    M2: "February",
    M3: "March",
    M4: "April",
    M5: "May",
    M6: "June",
    M7: "July",
    M8: "August",
    M9: "September",
    M10: "October",
    M11: "November",
    M12: "December",
  },

  Day: {
    Today: "Today",
    Mo: "MO",
    Tu: "TU",
    We: "WE",
    Th: "TH",
    Fr: "FR",
    Sa: "SA",
    Su: "SU",
  },

  Page: {
    Employee: {
      Title: "Employee",
      AddButton: "Add new employee",
      SearchPlaceholder: "Search by code or name",
      Form: {
        CreateTitle: "Add Employee",
        UpdateTitle: "Edit Employee",
      },
      Toast: {
        CreateSuccess: "Successfully added employee",
        UpdateSuccess: "Successfully updated employee",
        DeleteSuccess: "Successfully deleted employee",
        DuplicateSuccess: "Successfully duplicated employee",
      },
      Dialog: {
        DeleteConfirmTitle: "Delete Employee",
        DeleteConfirmDesc: (name) =>
          `Delete employee "${name}". The employee cannot be recovered after deletion`,
        MultipleDeleteConfirmDesc: (count) =>
          `Delete ${count} employees. Employees cannot be recovered after deletion`,
      },
      Validate: {
        EmployeeCode: "Code is required",
        FullName: "Name is required",
        Department: "Department is required",
        CodeFormat: "Code format is XX-1000 +",
        EmailFormat: "Email invalidate",
        MobilePhoneFormat: "Mobile phone invalidate",
      },

      EmployeeCode: {
        Title: "Code",
        SubTitle: "Employee code",
        Desc: "Code",
      },
      FullName: {
        Title: "Name",
        SubTitle: "Employee name",
        Desc: "Name",
      },
      Department: {
        Title: "Department",
        Desc: "Department",
      },
      Position: {
        Title: "Position",
        Desc: "Position",
      },
      DateOfBirth: {
        Title: "Date of Birth",
        Desc: "Date of Birth",
      },
      Gender: {
        Title: "Gender",
        Desc: "Gender",
      },
      IdentityNumber: {
        Title: "ID Number",
        Desc: "Identity Card Number",
      },
      IdentityDate: {
        Title: "Issue Date",
        Desc: "Issue Date",
      },
      IdentityPlace: {
        Title: "Issue Place",
        Desc: "Issue Place",
      },
      IsCustomer: {
        Title: "Customer",
        Desc: "Customer",
      },
      IsSupplier: {
        Title: "Supplier",
        Desc: "Supplier",
      },
      Address: {
        Title: "Address",
        Desc: "Address",
      },
      MobilePhone: {
        Title: "Mobile Phone",
        Desc: "Mobile Phone",
      },
      LandlinePhone: {
        Title: "Landline Phone",
        Desc: "Landline Phone",
      },
      Email: {
        Title: "Email",
        Desc: "Email",
      },
      BankAccount: {
        Title: "Bank Account",
        SubTitle: "Account Number",
        Desc: "Bank Account",
      },
      BankName: {
        Title: "Bank Name",
        Desc: "Bank Name",
      },
      BankBranch: {
        Title: "Bank Branch",
        SubTitle: "Bank Account Branch",
        Desc: "Bank Account Branch",
      },
    },
  },
};

export default resourceEn;
