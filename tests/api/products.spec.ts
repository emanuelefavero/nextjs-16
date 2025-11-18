import { expect, test } from '@playwright/test'

test.describe('/api/products API', () => {
  test('Full CRUD cycle: create, read, delete, and verify deletion', async ({
    request,
  }) => {
    const uniqueName = `Test Product ${Date.now()}`

    // Create product
    const createResponse = await request.post(
      'http://localhost:3000/api/products',
      {
        data: {
          name: uniqueName,
          quantity: 1,
          category: 'Test',
        },
      },
    )

    expect(createResponse.ok()).toBeTruthy()
    expect(createResponse.status()).toBe(201)

    const createBody = await createResponse.json()
    expect(createBody.data).toBeDefined()
    expect(createBody.data.id).toBeDefined()
    expect(createBody.data.name).toBe(uniqueName)

    const productId = createBody.data.id

    // Get all products and verify the created one is included
    const getResponse = await request.get('http://localhost:3000/api/products')

    expect(getResponse.ok()).toBeTruthy()
    expect(getResponse.status()).toBe(200)

    const products = await getResponse.json()
    expect(Array.isArray(products)).toBeTruthy()
    expect(products).toContainEqual(
      expect.objectContaining({
        id: productId,
        name: uniqueName,
        quantity: 1,
        category: 'Test',
      }),
    )

    // Delete the product
    const deleteResponse = await request.delete(
      `http://localhost:3000/api/products?id=${productId}`,
    )

    expect(deleteResponse.ok()).toBeTruthy()
    expect(deleteResponse.status()).toBe(200)

    const deleteBody = await deleteResponse.json()
    expect(deleteBody.data).toBeDefined()
    expect(deleteBody.data.id).toBe(productId)

    // Verify the product is deleted
    const finalGetResponse = await request.get(
      'http://localhost:3000/api/products',
    )

    expect(finalGetResponse.ok()).toBeTruthy()

    const finalProducts = await finalGetResponse.json()
    expect(finalProducts).not.toContainEqual(
      expect.objectContaining({ id: productId }),
    )
  })
})
