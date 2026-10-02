import { expect, fn, userEvent, within } from "storybook/test";
import { ProjectStory } from "./ProjectStory.jsx";
import { projectById } from "./content.js";

export default {
  title: "Stories/ProjectStory",
  component: ProjectStory,
  args: {
    project: projectById.picklejs,
    from: "capital",
    onBack: fn(),
    onMap: fn(),
    onProject: fn(),
  },
  argTypes: { project: { control: false } },
};

export const PickleJS = {};

export const FrontendBook = {
  args: { project: projectById["frontend-infra-book"], from: "publications" },
};

export const Interest = {
  args: { project: projectById.acroyoga, from: "hobbies" },
};

export const BookSecondChapter = {
  args: FrontendBook.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Next chapter" }));
    await expect(
      canvas.getByRole("heading", {
        name: projectById["frontend-infra-book"].chapters[1].title,
      }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("button", { name: "Previous chapter" }),
    ).toBeEnabled();
  },
};
