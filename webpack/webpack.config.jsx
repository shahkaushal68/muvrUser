import { merge } from "webpack-merge";
import commonConfig from "./webpack.common";

export default function webpackConfig(envVars) {
  const { env } = envVars;
  const { envConfig } = require(`./webpack.${env}.jsx`);
  const config = merge(commonConfig, envConfig);
  return config;
}
