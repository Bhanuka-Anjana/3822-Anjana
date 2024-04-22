import HTTP from "./httpService";

const apiEndpoint = "/users";

export async function registerUser(user) {
  const response = await HTTP.post(apiEndpoint, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    imgURL: "https://via.placeholder.com/150",
  });
  return response;
}

export async function getUsers() {
  const response = await HTTP.get(apiEndpoint);
  return response;
}

export function getUser(userId) {
  return HTTP.get(`${apiEndpoint}/${userId}`);
}

export function deleteUser(userId) {
  const response = HTTP.delete(`${apiEndpoint}/${userId}`);
  return response;
}

export async function updateUser(userId, user) {
  const data = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    imgURL: "https://via.placeholder.com/150",
    isAdmin: user.isAdmin,
  };
  if (user.isAdmin) data.isAdmin = user.isAdmin;
  const response = await HTTP.put(`${apiEndpoint}/${userId}`, data);
  return response;
}
