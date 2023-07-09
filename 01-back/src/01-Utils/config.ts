abstract class Config {
    public mySql = { host: "", user: "", password: "", database: "" };
    public errorFile: string = "./src/00-Assets/errors.json";
    public loginExpiresIn: string;
}

class DevelopmentConfig extends Config {
    public constructor() {
        super();
        this.loginExpiresIn = "3h"; //3 hours
        this.mySql = { host: "localhost", user: "root", password: "", database: "01-vacation-dream" };
    }
}

class ProductionConfig extends Config {
    public constructor() {
        super();
        this.loginExpiresIn = "3h"; //3 hours
        this.mySql = { host: "localhost", user: "root", password: "", database: "01-vacation-dream" };
    }
}

const config = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;