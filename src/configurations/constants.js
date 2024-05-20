require("dotenv").config();

module.exports = {
    DB_URL : process.env.DB_URI || `mongodb+srv://phinahas:phinahasphilip@my-cluster.udgav8g.mongodb.net/RMC-TEST?retryWrites=true&w=majority&appName=My-Cluster`,
    PORT:process.env.PORT || 8080,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY || '10958@Phinahas'
}
