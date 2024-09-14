import prisma from "../DB/db.config.js";

export const fetchPosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  if (page <= 0) {
    page = 1;
  }
  if (limit <= 0 || limit >= 1000) {
    limit = 10;
  }

  const skip = (page - 1) * limit;

  const posts = await prisma.post.findMany({
    skip: skip,
    take: limit,
    include: {
      comment: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
    // where: {
    //   comment_count: {
    //     gt: 1,
    //   },
    // },

    // where: {
    //   // OR
    //   //   NOT
    //   AND: [
    //     {
    //       title: {
    //         startsWith: "a",
    //       },
    //     },
    //     {
    //       title: {
    //         endsWith: "n",
    //       },
    //     },
    //   ],
    // },

    //filtration
    // where: {
    //   title: {
    //     startsWith: "ad",
    //     // endsWith:"",
    //     // equals: "",
    //   },
    // },
  });

  const toatalPosts = await prisma.post.count();
  const totalpages = Math.ceil(toatalPosts / limit);
  return res.json({
    status: 200,
    data: posts,
    meta: {
      totalpages,
      currentPage: page,
      limit,
    },
  });
};

export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;

  const newPost = await prisma.post.create({
    data: {
      user_id: Number(user_id),
      title,
      description,
    },
  });
  return res.json({ status: 200, data: newPost, msg: "Post created" });
};

export const showPost = async (req, res) => {
  const postId = req.params.id;
  const post = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
  });
  return res.json({ status: 200, data: post });
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });
  return res.json({ status: 200, msg: "Post deleted" });
};

export const searchPost = async (req, res) => {
  const query = req.query.q;
  const posts = await prisma.post.findMany({
    where: {
      description: {
        // search: query,
        contains: query,
      },
    },
  });
  return res.json({ status: 200, data: posts });
};
