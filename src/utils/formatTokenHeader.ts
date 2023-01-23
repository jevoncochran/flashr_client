const formatTokenHeader = (token: string | undefined) => {
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : `Bearer `,
    },
  };
};

export default formatTokenHeader;
