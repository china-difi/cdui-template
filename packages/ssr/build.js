import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('./server').map((file) => {
  return {
    file,
    data: fs.readFileSync(path.join('./server', file), 'utf8'),
  };
});

for (let i = 0, l = files.length; i < l; i++) {
  fs.writeFileSync(path.join('../../dist/ssr', files[i].file), files[i].data, 'utf8');
}
