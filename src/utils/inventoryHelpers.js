export const lowStock = (products, limit) => products.filter(p => Number(p.stock) <= Number(limit))
