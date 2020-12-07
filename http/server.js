if (process.env.NODE_ENV !== 'production') { //belum dites, belum tau benar/ngga
  require('dotenv').config();
}
const app = require('../app.js');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`app at http://localhost:${PORT}`);
})

