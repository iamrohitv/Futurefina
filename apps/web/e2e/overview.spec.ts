import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Overview dashboard", () => {
  test("renders the dashboard without accessibility violations", async ({
    page,
  }, testInfo) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /dashboard/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Pipeline activity", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Service mix", exact: true }),
    ).toBeVisible();
    await expect(page.getByText("Ramesh Patel").first()).toBeVisible();

    const accessibility = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(accessibility.violations).toEqual([]);

    await page.screenshot({
      path: `test-results/overview-${testInfo.project.name}.png`,
      fullPage: true,
    });
  });

  test("navigates from the overview to the inbox", async ({ page }) => {
    await page.goto("/");

    await page
      .getByRole("link", { name: /^Inbox/ })
      .first()
      .click();

    await expect(
      page.getByRole("heading", { name: "Inbox", exact: true }),
    ).toBeVisible();
  });
});
