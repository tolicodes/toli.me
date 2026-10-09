import { fn } from "storybook/test";
import { MapCanvas } from "./MapCanvas.jsx";
import { getMapSpots, maps } from "./content.js";

export default {
  title: "Explore/MapCanvas",
  component: MapCanvas,
  args: {
    map: maps.world,
    spots: getMapSpots("world"),
    reducedMotion: false,
    showLabels: true,
    onSelect: fn(),
    onSaveView: fn(),
  },
  argTypes: {
    map: { control: false },
    spots: { control: false },
    savedView: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", height: "100vh", minHeight: 450 }}>
        <Story />
      </div>
    ),
  ],
};

export const World = {};

export const Capital = {
  args: { map: maps.capital, spots: getMapSpots("capital") },
};

export const Mobile = {
  render: (args) => (
    <div
      style={{
        position: "relative",
        width: 390,
        maxWidth: "100%",
        height: 844,
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <MapCanvas {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A 390 × 844 map viewport exercises the readable mobile camera. Use a phone-sized browser viewport to inspect the responsive controls as well.",
      },
    },
  },
};

export const SavedZoom = {
  args: {
    map: maps.capital,
    spots: getMapSpots("capital"),
    savedView: { x: -520, y: -240, scale: 1.25 },
  },
};

export const ReducedMotion = {
  args: { reducedMotion: true },
};

export const PermanentLabels = {
  parameters: {
    docs: {
      description: {
        story:
          "Category labels stay visible beneath the symbols. The Capital has a crown; hover and keyboard focus still reveal the kingdom names.",
      },
    },
  },
};

export const DenseHobbies = {
  args: { map: maps.hobbies, spots: getMapSpots("hobbies") },
  parameters: {
    docs: {
      description: {
        story:
          "All 18 interests retain permanent labels. Longer titles wrap within their destination's width; full-map overviews shrink labels with the artwork to avoid collisions.",
      },
    },
  },
};

export const DenseHobbiesMobile = {
  ...Mobile,
  args: DenseHobbies.args,
};
