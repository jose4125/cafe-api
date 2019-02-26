import fs from 'fs';
import path from 'path';
import User from '../models/user';
import Product from '../models/product';

export async function uploadFile(req, res) {
  const { type } = req.params;
  if (!req.files) {
    res.status(400).json({
      ok: false,
      err: {
        message: 'you should add any file'
      }
    });
  }

  const validType = checkTypes(type);

  if (validType) {
    res.status(400).json({
      ok: false,
      err: {
        message: 'invalid type'
      }
    });
  }

  let fileToUpload = req.files.file;
  const validExtensions = checkExtension(fileToUpload);

  if (validExtensions) {
    res.status(400).json({
      ok: false,
      err: {
        message: 'invalid extension file',
        ext: fileExtension
      }
    });
  }

  setImagen(fileToUpload, req.params, res);
}

function getFileExtension(fileToUpload) {
  const fileArrayName = fileToUpload.name.split('.');
  return fileArrayName[fileArrayName.length - 1];
}

function checkTypes(type) {
  let validTypes = ['user', 'product'];
  return validTypes.indexOf(type) < 0;
}

function checkExtension(fileToUpload) {
  const fileExtension = getFileExtension(fileToUpload);
  let validExtensions = ['jpg', 'png', 'jpeg', 'svg'];

  return validExtensions.indexOf(fileExtension) < 0;
}

function removeImage(type, image) {
  let pathImage = path.resolve(__dirname, `../uploads/${type}/${image}`);

  if (fs.existsSync(pathImage)) {
    fs.unlinkSync(pathImage);
  }
}

async function setImagen(fileToUpload, params, res) {
  const { type, id } = params;
  const model = type === 'user' ? User : Product;
  const fileExtension = getFileExtension(fileToUpload);
  const fileName = `${id}-${new Date().getMilliseconds()}.${fileExtension}`;

  const responseDB = await model.findById(id);
  if (!responseDB) {
    res.status(400).json({
      ok: false,
      err: {
        message: 'invalid id'
      }
    });
    return;
  }

  removeImage(type, responseDB.img);

  responseDB.img = fileName;
  const newData = await responseDB.save();

  const newfile = await fileToUpload.mv(`uploads/${type}/${fileName}`);

  res.json({
    ok: true,
    user: newData
  });
}
