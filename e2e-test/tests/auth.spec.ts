import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test("should allow the user to sign in", async ({ page }) => {
	await page.goto(UI_URL);
	//get the sign in button

	await page.getByRole("link", { name: "Sign in" }).click();
	await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
	await page.locator("[name=email]").fill("asdasd@gmail.com");
	await page.locator("[name=password]").fill("123456");

	await page.getByRole("button", { name: "Log in" }).click();
	await expect(page.getByText("Log in successfull ")).toBeVisible();
	await expect(page.getByRole("link", { name: "My Booking" })).toBeVisible();
	await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
	// await page.getByRole("button", { name: "Sign out" })
});

test("should allow the user to register", async ({ page }) => {
	await page.goto(UI_URL);
	await page.getByRole("link", { name: "Sign in" }).click();
	await page.getByRole("link", { name: "Sign Up" }).click();
	await page.getByRole("heading", { name: "Create an account" });
	await page.locator("[name=firstName]").fill("ksik");
	await page.locator("[name=lastName]").fill("123ss");
	await page.locator("[name=email]").fill("asdas22d@gmail.com");
	await page.locator("[name=password]").fill("1234567");
	await page.locator("[name=confirmPassword]").fill("1234567");
	await page.getByRole("button", { name: "Register" }).click();
});

// test("get started link", async ({ page }) => {
// 	await page.goto("https://playwright.dev/");

// 	// Click the get started link.
// 	await page.getByRole("link", { name: "Get started" }).click();

// 	// Expects page to have a heading with the name of Installation.
// 	await expect(
// 		page.getByRole("heading", { name: "Installation" }),
// 	).toBeVisible();
// });
