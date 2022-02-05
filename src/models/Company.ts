import { Schema, model } from "mongoose";
import { Company } from "../interfaces/Company";

const schema = new Schema<Company>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cnpj: { type: String, required: true },
  founded: { type: String, required: true },
  founder: [{ type: Array, required: true }],
});

export const CompanyModal = model<Company>("Company", schema);
