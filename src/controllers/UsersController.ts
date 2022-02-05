const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { Request, Response } from "express";
import multer from "multer";
import { UserModal } from "../models/User";
const secret = "test";
const JWT_EXPIRES_IN = '1hr';
export class UsersController {
  async create(request: Request, response: Response) {
    try {
      const {
        name,
        email,
        username,
        password,
        passwordCheck,
        avatar = request.file?.path,
        type,
        address,
      } = request.body;

      if (
        !email ||
        !password ||
        !username ||
        !address ||
        !avatar ||
        !passwordCheck
      ) {
        return response
          .status(400)
          .json({ msg: "Todos os Campos são obrigatórios" });
      }
      if (password.length < 5) {
        return response
          .status(400)
          .json({ msg: "A senha tem que ter no minimo 5 caracteres" });
      }

      if (password !== passwordCheck) {
        return response.status(400).json({ msg: "As senhas não são iguais" });
      }

      const existingEmail = await UserModal.findOne({ email: email });
      if (existingEmail) {
        return response
          .status(400)
          .json({ msg: "Erro ao criar conta, email já existe!" });
      }

      const existingUsername = await UserModal.findOne({ username: username });
      if (existingUsername) {
        return response
          .status(400)
          .json({ msg: "Erro ao criar conta, Nome de Usuário já existe!" });
      }
      const salt = await bcrypt.genSalt();
      // const passwordHash = await bcrypt.hash(password, salt);
      const user = await UserModal.create({
        name,
        email,
        username,
        password,
        passwordCheck,
        avatar,
        type,
        address
      });
      const savedUser = await user.save();
      response.json(savedUser);

      //return response.json(user);
    } catch (error) {
      response.status(500).json({ err: "Usuário não pode ser criado" + error });
    }
  }

  async findAll(request: Request, response: Response) {
    const users = await UserModal.find();
    return response.json(users);
  }

  async findById(request: Request, response: Response) {
    const { id } = request.params;
    const user = await UserModal.findById(id);
    return response.json(user);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, username, password, active, avatar, type } =
      request.body;

    const user = await UserModal.findByIdAndUpdate(
      id,
      {
        name,
        email,
        username,
        password,
        active,
        type,
        avatar
      },
      { new: true }
    );

    return response.json(user);
  }

  //fazendo login
  async login(request: Request, response: Response) {
    try {
      const { username, password } = request.body;
      if (!username || !password) {
        return response
          .status(400)
          .json({ msg: "Usuário e Senha não poderá ser vazio." });
      }
      // verificando o e-mail que foi inserido e comparando o e-mail em nosso banco de dados
      const user = await UserModal.findOne({ username: username });

      if (!user) {
        return response
          .status(400)
          .json({ msg: "Credencial Invalida: Nome de Usuário" });
      }
      if (password == user.password) {
        const token = jwt.sign({ id: user._id }, { JWT_EXPIRES_IN }, process.env.SECRET);
        response.json({
          token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            type: user.type,
          },
        });
      }

      if (password !== user.password) {
        return response
          .status(400)
          .json({ message: "Credencial Invalida: Senha do Usuário errada" });
      }
    } catch (error) {
      response.status(500).json({ err: "Login não realizado: Token" });
    }
  }

  //validar se o usuário está logado por verificação booleana mais útil para front-end
  async tokenIsValid(request: Request, response: Response) {
    try {
      const token = request.header("x-auth-token");
      if (!token) return response.json(false);

      const verified = jwt.verify(token, secret);
      if (!verified) return response.json(false);

      const user = await UserModal.findById(verified.id);
      if (!user) return response.json(false);
      return response.json(true);
    } catch (error) {
      response
        .status(500)
        .json({ err: "Ocorreu um erro na verificação do token" });
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    await UserModal.findByIdAndRemove(id);
    return response.sendStatus(204);
  }
}
