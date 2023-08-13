const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/show-me-something-new_development",
      test: "postgres://postgres:postgres@localhost:5432/show-me-something-new_test",
      e2e: "postgres://postgres:postgres@localhost:5432/show-me-something-new_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
