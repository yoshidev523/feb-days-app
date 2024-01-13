import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CheckCard } from "@/components/CheckCard";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("renders correctly %s", async () => {
  render(<CheckCard />);

  // ACT
  fireEvent.input(screen.getByPlaceholderText("2024"), {
    target: {
      value: "2024",
    },
  });
  await userEvent.click(screen.getByRole("button"));

  // assert
  await waitFor(
    () => {
      expect(screen.getByTestId("message")).toHaveTextContent("29 days.");
    },
    {
      timeout: 2500,
    },
  );
});
