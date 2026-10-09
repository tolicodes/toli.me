import { useState } from "react";
import { fn } from "storybook/test";
import { AboutDialog } from "./App.jsx";

function IntroductionPreview(args) {
  const [open, setOpen] = useState(true);
  const close = () => {
    args.onClose?.();
    setOpen(false);
  };
  const visit = (id) => {
    args.onMap?.(id);
    setOpen(false);
  };
  return (
    <>
      <div style={{ padding: 32 }}>
        <button className="primary-button" onClick={() => setOpen(true)}>
          Meet Toli
        </button>
      </div>
      {open && <AboutDialog {...args} onClose={close} onMap={visit} />}
    </>
  );
}

export default {
  title: "Explore/AboutDialog",
  component: AboutDialog,
  render: (args) => <IntroductionPreview {...args} />,
  args: { onClose: fn(), onMap: fn() },
};

export const Introduction = {};
