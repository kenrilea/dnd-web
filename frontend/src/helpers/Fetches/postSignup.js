import passwordCheck from "../passwordCheck.js";

import proxy from "../../proxy.js";

let PostSignup = (username, password, confirmPassword) => {
  return new Promise((resolve, reject) => {
    if (password !== confirmPassword) {
      resolve({ success: false, result: "passwords did not match" });
      return;
    }
    if (!passwordCheck(password)) {
      resolve({
        success: false,
        result:
          "Password must be 7 or more characters long and contain one lowercase letter, one number, on upper case letter"
      });
      return;
    }
    let data = new FormData();
    data.append("username", username);
    data.append("password", password);
    return fetch(proxy + "/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    })
      .then(res => {
        return res.text();
      })
      .then(resBody => {
        const parsedBody = JSON.parse(resBody);
        resolve(parsedBody);
        return;
      });
  });
};

export default PostSignup;
