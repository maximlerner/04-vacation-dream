abstract class Config {
    public mySql = { host: "", user: "", password: "", database: "" };
    public errorFile: string = "./src/00-Assets/errors.json";
    public loginExpiresIn: string;
    public port : number;
}

class DevelopmentConfig extends Config {
    public constructor() {
        super();
        this.loginExpiresIn = "3h"; //3 hours
        this.mySql = { host: "localhost", user: "root", password: "", database: "01-vacation-dream" };
        this.port = 3001;
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super();
        this.loginExpiresIn = "3h"; //3 hours
        this.mySql = { host: "eu-cdbr-west-03.cleardb.net", user: "bb3d266e4eb8e0", password: "82ccfb59", database: "heroku_8c9889309c0dd7f" };
        this.port = process.env.PORT ? +(process.env.PORT) : 3001;
    }
}

const config = process.env.ENVIRONMENT === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;