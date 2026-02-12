export interface ReqLoginDTO {
  email: string;
  password: string;
}

export interface ResLoginDTO {
  status: string;
  message: string;
  data: {
    access_token: string;
  };
}

export interface ReqRegisterDTO {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface ResRegisterDTO {
  status: string;
  message: string;
  data: {
    userId: string;
  };
}
