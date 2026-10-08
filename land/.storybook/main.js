export default {
  stories: ["../src/**/*.stories.jsx"],
  framework: "@storybook/react-vite",
  staticDirs: ["../public"],
  // Storybook owns the public-directory copy; avoid a second Vite copy racing it.
  viteFinal: (config) => ({ ...config, publicDir: false }),
  core: { disableTelemetry: true },
};
