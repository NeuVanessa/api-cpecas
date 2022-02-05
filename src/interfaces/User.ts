export interface User {

  name: string;
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
  avatar: string;
  address: Array<Address>;
  type: string;

}

export interface Address {
  adress: string;
  number: number;
  complement: string;
  zipcode: string;
}

