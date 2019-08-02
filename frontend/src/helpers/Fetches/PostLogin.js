import proxy from "../../proxy.js";

let postLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    fetch(proxy + "/login", {
      method: "POST",
      credentials: "include",
      body: data
    })
      .then(res => {
        return res.text();
      })
      .then(resBody => {
        const parsedBody = JSON.parse(resBody);
        resolve(parsedBody);
      });
  });
};
export default postLogin;
