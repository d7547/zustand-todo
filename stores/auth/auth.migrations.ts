export const authMigrations = {
  0: (state: any) => {
    // v0 -> v1: Add avatar field if missing
    if (state.user && !state.user.avatar) {
      state.user.avatar = undefined;
    }
    return state;
  },
};