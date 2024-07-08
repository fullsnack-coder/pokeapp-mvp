const configKeys = {
  domain: (() => {
    if (typeof window === "undefined") {
      return `${
        process.env.NODE_ENV === "test" ||
        process.env.NODE_ENV === "development"
          ? "http://127.0.0.1:3000"
          : process.env.NEXT_PUBLIC_HOST_DOMAIN
      }`;
    } else {
      return `${
        process.env.NODE_ENV === "test" ||
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : process.env.NEXT_PUBLIC_HOST_DOMAIN
      }`;
    }
  })(),
};

export default configKeys;
