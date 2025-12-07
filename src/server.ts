import app from "./app";
import config from "./config";
const { port } = config;
app.listen(port, () => {
  console.log(`Vehicle management system app listening on port ${port}`);
});
