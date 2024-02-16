import { DefinePlugin, ProvidePlugin } from "webpack";

export const envConfig = {
  mode: "production",
  plugins: [
    new ProvidePlugin({
      compress: {
        // remove warnings
        warnings: false,
        // Drop console statements
        drop_console: true,
      },
    }),
    new DefinePlugin({
      "process.env.REACT_APP_NAME": JSON.stringify("Muvr"),
      "process.env.REACT_APP_MODE": JSON.stringify("production"),
      "process.env.REACT_DEVICE_TYPE": JSON.stringify("web"),
      "process.env.REACT_APP_ENCRYPTION_SECRET_KEY": JSON.stringify("thisisprivatekeyfordevenviourment"),
      "process.env.REACT_APP_ENCRYPTION_MESSAGE": JSON.stringify("local-message"),
      "process.env.REACT_APP_API_URL": JSON.stringify("https://api.muvr.io/api"),
      "process.env.REACT_APP_API_IMAGE_URL": JSON.stringify("https://api.muvr.io/public/"),
      "process.env.REACT_APP_SOCKET_URL": JSON.stringify("https://api.muvr.io"),
      "process.env.REACT_APP_Google_MAP_KEY": JSON.stringify("AIzaSyD59qYcHACOpiII4fexjuFz4kN1QtMGeu0"),
      "process.env.REACT_APP_STRIPE_PUBLIC_KEY": JSON.stringify("pk_test_51MRLuQKSqywGcvV5GzAgSV5nZtr50DPMmqSodIK3KzwMbAe7FSYfCRFg3IbbDDDWsuL6xT2VDFvLaQpFvT56aqeM007XRHJ7cp"),
      "process.env.REACT_APP_STRIPE_SECRET_KEY": JSON.stringify("sk_test_51MRLuQKSqywGcvV5i5m3txPBAjOI1BgjmZnUXUHIZQVW3jPGPUoELHzdhIKiXuxILySYgP0FFw0twkWJKAe0gnTI00sSo8coRc"),
    }),
  ],
};
