module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@accounts": "./src/modules/accounts", 
          "@cars": "./src/modules/cars", 
          "@rentals": "./src/modules/rentals", 
          "@config": "./src/config", 
          "@utils": "./src/utils",
          "@shared": "./src/shared",
          "@myTypes": "./src/@types/myTypes",
          "@docs": "./src/docs"
        }
      }
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }]
  ]
}