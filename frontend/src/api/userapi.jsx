import axios from "axios";

const baseURL = "http://localhost:8000/api/users";

export const getAllUsers = (page = 1) => {
  return axios.get(`http://localhost:8000/api/users/?page=${page}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    }
  });
};

export const addNewUser = (user) => {
  return axios.post("http://localhost:8000/auth/users/", {
    username: user.username,
    name: user.name,
    email: user.email,
    password: user.password || '123456',
    role: user.role,
    phone: user.phone,
    profile_image: user.profileImage || ''
  });
};

export const editUser = (userId, user) => {
  return axios.patch(`${baseURL}/${userId}/`, {
    username: user.username,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    profile_image: user.profileImage || ''
  });
};

export const deleteUser = (userId) => axios.delete(`${baseURL}/${userId}/`);

const getUserById = (userId) => axios.get(`${baseURL}/${userId}`);
const loginUser = async (credentials) => {
  const res = await axios.post("http://localhost:8000/auth/jwt/create", credentials);
  localStorage.setItem("access_token", res.data.access);
  localStorage.setItem("refresh_token", res.data.refresh);
  const resUser = await axios.get("http://localhost:8000/auth/users/me", { headers: { Authorization: `Bearer ${res.data.access}` } });
  // Normalize backend fields to frontend shape
  const u = resUser.data || {};
  const normalized = {
    id: u.id,
    username: u.username,
    email: u.email,
    role: u.role,
    phone: u.phone,
    name: u.name || u.username || '',
    profileImage: u.profile_image || u.profileImage || '',
    date_joined: u.date_joined,
  };

  return { status: resUser.status, data: normalized };
}
const checkEmailExists = (email) => axios.get(`${baseURL}?email=${email}`);

export {
  getUserById,
  loginUser,
  checkEmailExists
};