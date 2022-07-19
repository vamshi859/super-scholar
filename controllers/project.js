import Product from "../models/product.js";

export const createProject = async (req, res) => {
  const { title } = req.body;
  try {
    if (title !== "") {
      const projects = await Product.find();
      if (projects.length !== 0) {
        let id = projects[projects.length - 1].id;
        const projectBody = { title, id: id + 1, stage: 1 };
        const project = new Product(projectBody);
        await project.save();
        res.status(201).json(project);
      } else {
        const id = 1;
        const projectBody = { title, id, stage: 1 };
        const project = new Product(projectBody);
        await project.save();
        res.status(201).json(project);
      }
    }
  } catch (error) {
    res.status(400).json("No requirements");
    console.log(error);
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { stage } = req.body;
  if (stage === 1 || stage === 2 || stage === 3) {
    try {
      await Product.findOneAndUpdate(
        { id },
        {
          $set: {
            stage,
          },
        }
      );
      const updatedProject = await Product.findOne({ id });
      if (updatedProject === null) {
        res.status(400).json("No requirements");
      }
      res.status(200).json(updatedProject);
    } catch (error) {
      res.status(400).json("No requirements");
      console.log(error);
    }
  } else {
    res.status(400).json("No requirements");
  }
};
