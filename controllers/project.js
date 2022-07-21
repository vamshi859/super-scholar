import Product from "../models/product.js";
import axios from "axios";
const API = axios.create({baseURL: 'https://jsonmock.hackerrank.com/api/'})

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
     const updatedProject =  await Product.findOneAndUpdate(
        { id },
        {
          $set: {
            stage,
          },
        },{new:true}
      );
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

export const getArticles =async (req,res) => {
  try {
    const response = await API.get('articles')
    const total_pages = response.data.total_pages;
    let finalData = []
    for(let i=1;i<=total_pages;i++){
      const res = await API.get('articles?page='+i);
      const data = res.data.data;
      finalData.push(...data)
    }
    const articles = finalData.filter((article) => {
      return article.title!=="" || article.title!==null || article.story_title!==null
    }).sort((a, b) => {
      if(a.num_comments===b.num_comments){
        if(a.title==="" && b.title===""){
          return (a.story_title > b.story_title) - (a.story_title < b.story_title)
        }else if(a.title===""){
          return (a.story_title > b.title) - (a.story_title < b.title)
        }else if(b.title===""){
          return (a.title > b.story_title) - (a.title < b.story_title)
        }else{
          return (a.title > b.title) - (a.title < b.title)
        }
      }else{
        return b.num_comments - a.num_comments
      }
    })
    const topArticles = (n) => {
      const article =  articles.slice(0,n)
      let finalData = []
      for(let i of article){
          finalData.push(
            {title:i.title,story_title:i.story_title,num_comments:i.num_comments}
          )
      }
      return finalData;
    }
    res.status(200).json(topArticles(2))
  } catch (error) {
    res.status(400).json("No data")
  }
}
