let appSettings: any = {};
export const httpService = {
  async request(
    request: RequestInfo,
    init?: RequestInit,
    showLoaderIcon = true
  ) {
    try {
      let self = this;
      return new Promise((resolve, reject) => {
        if (showLoaderIcon) {
          this.showLoader();
        }
        fetch(request, init)
          .then((response) => {
            this.hideLoader();
            if (response.status == 200 || response.status == 201) {
              this.parseJSON(response).then((data) => {
                // let result = { completed: true, response, data };
                resolve(data);
              });
            } else if (response.status == 401) {
              alert("Unauthorized access ! Please login again");
              let result = { completed: false, response, data: null };
              resolve(result);
            } else {
              let result = { completed: false, response };
              resolve(response);
            }
          })
          .catch((err: any) => {
            this.hideLoader();
            let result = { completed: false, error: err };
            resolve(result);
          });
      });
    } catch (e) {
      alert("REQUEST FAILED");
    }
  },

  parseJSON: (response: any) => {
    return new Promise((resolve) => {
      response.json().then((data: any) => {
        resolve(data);
      });
    });
  },
  showLoader: () => {
    let element: any = document.getElementById("loader");
    if (element) {
      element.style.display = "block";
    }
  },

  hideLoader: () => {
    let element: any = document.getElementById("loader");
    if (element) {
      element.style.display = "none";
    }
  },
};
