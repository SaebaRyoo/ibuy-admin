const AdminRole = 1;

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.UserProfile } | undefined) {
  const { currentUser } = initialState ?? {};

  console.log('currentUser--->', currentUser);
  return {
    isAdmin: currentUser && currentUser.roles?.includes(AdminRole),
  };
}
