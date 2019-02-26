import path from 'path';
import fs from 'fs';

export function getImage(req, res) {
  const { type, img } = req.params;
  const pathImg = path.resolve(__dirname, `../uploads/${type}/${img}`);
  const noImagePath = path.resolve(__dirname, '../public/images/no-image.jpg');

  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    res.sendFile(noImagePath);
  }
}
