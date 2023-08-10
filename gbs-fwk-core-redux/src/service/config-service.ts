let appSettings: any = {};

export const configService = {
  loadConfigData: (): Promise<any> => {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("Access-Control-Allow-Origin", "*");

      fetch("assets/app-settings.json", {
        method: "GET",
        mode: "cors",
        headers: headers,
      })
        .then((response) => response.json())
        .then((appsetting) => {
          appSettings = appsetting;
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
        });
    });
  },

  getConfigValue: (key: string): string => {
    try {
      return appSettings[key];
    } catch (ex) {
      return "";
    }
  },
};
