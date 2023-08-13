const environments = {
	development: "http://localhost:8000",
	production: "/api",
};

const baseURL = environments[process.env.NODE_ENV] || "";

export { baseURL };
