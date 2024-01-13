import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CheckCard } from "@/components/CheckCard";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

test("input 2024", async () => {
  render(<CheckCard />);

  // act
  fireEvent.input(screen.getByTestId("input"), {
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
