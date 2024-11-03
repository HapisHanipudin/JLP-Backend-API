export const userTransformer = (user) => {
  const transformedUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    profileImage: user.profileImage,
    handle: "@" + user.username,
  };

  // Jika user memiliki vendorToken, tambahkan ke dalam object
  if (user.vendorToken) {
    transformedUser.vendorToken = user.vendorToken;
  }

  if (user.phone) {
    transformedUser.phone = user.phone;
  }

  return transformedUser;
};
