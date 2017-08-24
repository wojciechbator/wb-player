const cottage = require('cottage');
const { createReadStream } = require('fs');
const path = require('path');
const streamData = require('./audio-stream/index');
const app = cottage();

app.use(streamData());

app.get('/', async (req, res) => {
    res.type = 'html';
    res.body = await createReadStream(path.resolve(__dirname, 'index.html'));
});

app.listen(3000);                      // note: don't use "if (!module.parent)"!
