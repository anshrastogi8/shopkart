export const header = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const commonHeader = (token) => {
  if (!token) {
    return header;
  }

  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};
