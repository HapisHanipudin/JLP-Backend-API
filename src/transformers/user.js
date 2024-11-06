export const userTransformer = (user) => {
  const transformedUser = {
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone || null,
    profileImage: user.profileImage,
    handle: `@${user.username}`,
    vendorId: user.vendorId || null,
  };

  return transformedUser;
};
