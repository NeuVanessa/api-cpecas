import { User } from "./User";

export interface Company {
  name: string;
  description: string;
  cnpj: string;
  //data de fundação da empresa
  founded: string;
  //fundador da empresa
  founder: [
    {
      user: Array<User>;
      cpf:string;
    }
  ];
}
