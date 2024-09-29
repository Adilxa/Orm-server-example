import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ msg: "Неверный email или пароль!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Неверный email или пароль!" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({ msg: "Успешный вход", token });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    return res.status(500).json({ msg: "Ошибка сервера" });
  }
};

export const fetchUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    // include: {
    //   post: {
    //     select: {
    //       title: true,
    //     },
    //   },
    // },
    select: {
      _count: {
        select: {
          post: true,
          comment: true,
        },
      },
    },
  });

  return res.json({ status: 200, data: users });
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({
      status: 400,
      message: "Email is already taken please choose another one!",
    });
  }

  const newUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });
  return res.json({ status: 200, data: newUser, msg: "user created" });
};

export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      name,
      email,
      password,
    },
  });
  return res.json({ status: 200, message: "user updated successfully" });
};

export const showUser = async (req, res) => {
  const userId = req.params.id;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });
  return res.json({ status: 200, data: user });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });
  return res.json({ status: 200, msg: "User deleted" });
};

export const signUp = async (req, res) => {
  const { email, password, name } = req.body;

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.json({ status: 400, msg: "This email is already taken!" });
  } else {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email,
        password: hashedPassword,
      },
    });
    return res.json({ status: 200, data: newUser, msg: "user created" });
  }
};
