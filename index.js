import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import { resolve } from "path";

dotenv.config();

const app = express();
const PORT = 8000;

/* ===== Multer Storage ===== */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

/* ===== App Config ===== */
app.set("view engine", "ejs");
app.set("views", resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ===== Routes ===== */
app.get("/", (req, res) => {
  res.render("homepage");
});
app.get("/",(req,res)=>{
    res.render("about")
})
app.render("uploadSuccess",{filepath:req.file.path})
app.post(
  "/upload",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 }
  ]),
  (req, res) => {
    console.log(req.files);

    const avatarLocalPath =
      req.files?.avatar?.[0]?.path;

    const coverImageLocalPath =
      req.files?.coverImage?.[0]?.path;

    res.json({
      avatarLocalPath,
      coverImageLocalPath
    });
  }
);

/* ===== Server ===== */
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
