const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/show-me-what-you-got_development",
      test: "postgres://postgres:postgres@localhost:5432/show-me-what-you-got_test",
      e2e: "postgres://postgres:postgres@localhost:5432/show-me-what-you-got_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
