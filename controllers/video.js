import video from "../Models/video.js";

export const uploadvideo = async (req, res) => {
  if (req.file === undefined) {
    return res
      .status(404)
      .json({ message: "plz upload a mp4 video file only" });
  } else {
    try {
      const file = new video({
        videotitle: req.body.videotitle,
        filename: req.file.originalname,
        filepath: req.file.path,
        filetype: req.file.mimetype,
        filesize: req.file.size,
        videochanel: req.body.videochanel,
        uploader: req.body.uploader,
      });
      await file.save();
      return res.status(201).json("file uploaded successfully");
    } catch (error) {
      console.error(" error:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
};
export const getallvideo = async (req, res) => {
  try {
    const files = await video.find();
    return res.status(200).send(files);
  } catch (error) {
    console.error(" error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const createvideo = async (req, res) => {
  try {
    const newVideo = await video.create({
      videotitle: req.body.videotitle,
      filename: req.body.filename,      
      filetype: req.body.filetype,      
      filepath: req.body.filepath,      
      filesize: req.body.filesize,      
      videochanel: req.body.videochanel,
      Like: 0,
      views: 0,
      uploader: req.body.uploader || "test_user",
    });

    return res
      .status(201)
      .json({ message: "Video created", video: newVideo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error creating video" });
  }
};
