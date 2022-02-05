import { Schema, model } from "mongoose";
import { Manufacture } from "../interfaces/Manufacturer";

const schema = new Schema<Manufacture>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    product: [{ type: Array, required: true }]
});

export const ManufactureModal = model<Manufacture>("Manufacture", schema);
