import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { Atlas } from "./Atlas.jsx";

function AtlasPreview(args) {
  const [open, setOpen] = useState(true);
  const finish =
    (callback) =>
    (...values) => {
      callback?.(...values);
      setOpen(false);
    };
  return (
    <>
      <div style={{ padding: 32 }}>
        <button className="primary-button" onClick={() => setOpen(true)}>
          Open the atlas
        </button>
      </div>
      {open && (
        <Atlas
          {...args}
          key={args.initialFilter}
          onClose={finish(args.onClose)}
          onMap={finish(args.onMap)}
          onProject={finish(args.onProject)}
        />
      )}
    </>
  );
}

export default {
  title: "Explore/Atlas",
  component: Atlas,
  render: (args) => <AtlasPreview {...args} />,
  args: { initialFilter: "all", onClose: fn(), onMap: fn(), onProject: fn() },
  argTypes: {
    initialFilter: {
      control: "select",
      options: [
        "all",
        "featured",
        "work",
        "publications",
        "speaking",
        "creative",
        "writing",
        "hobbies",
        "misc",
      ],
    },
  },
};

export const All = {};

export const Featured = { args: { initialFilter: "featured" } };

export const Hobbies = { args: { initialFilter: "hobbies" } };

export const EmptySearch = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      await canvas.findByRole("textbox", { name: "Search the atlas" }),
      "unmapped-quasar-987",
    );
    await expect(
      canvas.getByText("No places match this search yet."),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: /Take a detour/ }),
    ).toBeDisabled();
  },
};
