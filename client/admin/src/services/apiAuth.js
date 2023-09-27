import axios from "axios";

const options = {
  method: "GET",
  url: " https://api.country.is/9.9.9.9 ",
};

async function login() {
  const respone = await axios.request(options);
  console.log(respone.data);
}

export { login };
