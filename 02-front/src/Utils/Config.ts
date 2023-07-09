abstract class Config {
  public urls = {
    vacations: "",
    vacationImages: "",
    register:"",
    login:"",
    spinner:""
  };

  public constructor(baseUrl: string) {
    this.urls = {
      vacations: `${baseUrl}vacations/`,
      vacationImages: `${baseUrl}vacations/images/`,
      register:`${baseUrl}auth/register`,
      login:`${baseUrl}auth/login`,
      spinner:"./Assets/blue-spinner.gif"
    };
  }
}

class DevelopmentConfig extends Config {
  public constructor() {
    super("http://localhost:3001/api/");
  }
}

class ProductionConfig extends Config {
  public constructor() {
    super("http://localhost:3001/api/");
  }
}

const config =
  process.env.NODE_ENV === "development"
    ? new DevelopmentConfig()
    : new ProductionConfig();

export default config;
