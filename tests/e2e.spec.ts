import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/February Days/);
});

test("input 2024 is leap day", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByTestId("input").click();
  await page.getByTestId("input").fill("2024");
  await page.getByRole("button", { name: "Check" }).click();
  await expect(
    page.getByTestId("message").getByRole("paragraph"),
  ).toContainText("February 2024 has 29 days.");
});

test("input 2025 is not leap day", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByTestId("input").click();
  await page.getByTestId("input").fill("2025");
  await page.getByRole("button", { name: "Check" }).click();
  await expect(
    page.getByTestId("message").getByRole("paragraph"),
  ).toContainText("February 2025 has 28 days.");
});

test("input -1 is error", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByTestId("input").click();
  await page.getByTestId("input").fill("-1");
  await page.getByRole("button", { name: "Check" }).click();
  await expect(
    page.getByTestId("message").getByRole("paragraph"),
  ).toContainText("Something Wrong... :(");
});
