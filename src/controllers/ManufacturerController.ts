import { Request, Response } from "express";
import { ManufactureModal } from "../models/Manufacturer";

export class ManufacturerController {
  async create(request: Request, response: Response) {
    try {
      const { name, product } = request.body;

      if (!name || !product) {
        return response
          .status(400)
          .json({ msg: "Todos os Campos são obrigatórios" });
      }

      const manufactureModal = await ManufactureModal.create({
        name,
        product,
      });
      const savedManufactureModal = await manufactureModal.save();
      response.json(savedManufactureModal);

      //return response.json(user);
    } catch (error) {
      response.status(500).json({ err: "Produto não pode ser criado" + error });
    }
  }

  async findAll(request: Request, response: Response) {
    const manufactureModal = await ManufactureModal.find();
    return response.json(manufactureModal);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;
    const manufacture = await ManufactureModal.findById(id);
    return response.json(manufacture);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, product } = request.body;

    const user = await ManufactureModal.findByIdAndUpdate(
      id,
      {
        name,
        product,
      },
      { new: true }
    );

    return response.json(user);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    await ManufactureModal.findByIdAndRemove(id);
    return response.sendStatus(204);
  }
}
