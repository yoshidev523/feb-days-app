import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/February Days/);
});

test("2024と入力すると29日と出力される", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("spinbutton").click();
  await page.getByRole("spinbutton").fill("2024");
  await page.getByRole("button", { name: "Check" }).click();
  await expect(page.getByRole("main")).toContainText(
    "February 2024 has 29 days.",
  );
});

test("2025と入力すると28日と出力される", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("spinbutton").click();
  await page.getByRole("spinbutton").fill("2025");
  await page.getByRole("button", { name: "Check" }).click();
  await expect(page.getByRole("main")).toContainText(
    "February 2025 has 28 days.",
  );
});

test("-1と入力するとエラーメッセージが出力される", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("spinbutton").click();
  await page.getByRole("spinbutton").fill("-1");
  await page.getByRole("button", { name: "Check" }).click();
  await expect(page.getByRole("main")).toContainText("Something Wrong... :(");
});
