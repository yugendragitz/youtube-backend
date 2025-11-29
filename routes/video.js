import express from "express";
import { getallvideo, uploadvideo, createvideo } from "../controllers/video.js";
import upload from "../filehelper/filehelper.js";

const routes = express.Router();

// Upload actual video file
routes.post("/upload", upload.single("file"), uploadvideo);

// Create video entry manually (without file)
routes.post("/create", createvideo);

// Get all videos
routes.get("/getall", getallvideo);

export default routes;
