export const getAuthHeaders = () => {
  const token = sessionStorage.getItem('accessToken');
  return token ? { Authorization: token } : {};
};
