import { test, expect } from '@playwright/test';
const U = (path = '') => `/api/users${path}`;

// Minimal shape check helper
function isUser(o: any) {
  return o && typeof o.id === 'string' && typeof o.email === 'string';
}

test.describe('Tabs Generator and API testing', () => {
  test('Tabs -> add tab -> list row shows entered values', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: /^tabs$/i }).click();

    // create one item
    await page.getByLabel(/^ID$/).fill('intro');
    await page.getByLabel(/^Name$/).fill('Intro');
    await page.getByLabel(/^Title$/).fill('Welcome');
    await page.getByLabel(/^Content/).fill('<p>Hello world</p>');
    await page.getByRole('button', { name: /add tab/i }).click();

    const list = page.getByRole('list').first();
    const row = list.getByRole('listitem').first();

    // ✅ check values (NOT text)
    await expect(row.getByLabel(/^Name$/)).toHaveValue('Intro');
    await expect(row.getByLabel(/^Title$/)).toHaveValue('Welcome');
    await expect(row.getByLabel(/^Content/)).toHaveValue('<p>Hello world</p>');
  });
  test('POST -> GET(id) -> PATCH -> DELETE', async ({ request, baseURL }) => {
    const url = new URL(U(), baseURL).toString();

    // CREATE
    const create = await request.post(url, {
      data: { name: 'Duong Test', email: `duong.${Date.now()}@example.com` },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(create.status()).toBe(201);
    const created = await create.json();
    expect(isUser(created)).toBeTruthy();
    const id = created.id as string;

    // GET one (?id=)
    const getOne = await request.get(new URL(U(`?id=${id}`), baseURL).toString());
    expect(getOne.ok()).toBeTruthy();
    const one = await getOne.json();
    expect(one.id).toBe(id);

    // LIST
    const list = await request.get(new URL(U(), baseURL).toString());
    expect(list.ok()).toBeTruthy();
    const arr = await list.json();
    expect(Array.isArray(arr)).toBeTruthy();
    expect(arr.some((u: any) => u.id === id)).toBeTruthy();

    // UPDATE (PATCH ?id=)
    const patch = await request.patch(new URL(U(`?id=${id}`), baseURL).toString(), {
      data: { name: 'Duong Updated' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(patch.ok()).toBeTruthy();
    const updated = await patch.json();
    expect(updated.name).toBe('Duong Updated');

    // DELETE (DELETE ?id=)
    const del = await request.delete(new URL(U(`?id=${id}`), baseURL).toString());
    expect(del.status()).toBe(204);

    // GET after delete -> 404
    const after = await request.get(new URL(U(`?id=${id}`), baseURL).toString());
    expect(after.status()).toBe(404);
  });

  test('POST validation: missing fields -> 400', async ({ request, baseURL }) => {
    const res = await request.post(new URL(U(), baseURL).toString(), {
      data: { name: '' }, // missing email
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status()).toBe(400);
    const text = await res.text();
    // your code returns 'Missing name or email'
    expect(text.toLowerCase()).toContain('missing');
  });

});
