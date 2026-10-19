export const initialData = {
  settings: { businessName: 'متجر أحمد', currency: 'ج.م', lowStockLimit: 5, profileName: 'أحمد محمد', email: 'ahmed@example.com', theme: 'light' },
  products: [
    { id: 'p1', sku: 'SF-1001', name: 'قميص كتان صيفي', category: 'ملابس', buyPrice: 200, sellPrice: 350, stock: 25, sizes: 'S, M, L, XL', colors: 'أبيض، بيج', image: '' },
    { id: 'p2', sku: 'SF-1002', name: 'بلوزة نسائية', category: 'ملابس', buyPrice: 150, sellPrice: 250, stock: 18, sizes: 'S, M, L', colors: 'أسود، وردي', image: '' },
    { id: 'p3', sku: 'SF-1003', name: 'بنطلون جينز', category: 'ملابس', buyPrice: 180, sellPrice: 300, stock: 4, sizes: 'M, L, XL', colors: 'أزرق، أسود', image: '' },
    { id: 'p4', sku: 'SF-1004', name: 'شنطة يد', category: 'إكسسوارات', buyPrice: 300, sellPrice: 450, stock: 8, sizes: 'مقاس واحد', colors: 'بني، أسود', image: '' },
    { id: 'p5', sku: 'SF-1005', name: 'إكسسوارات شعر', category: 'إكسسوارات', buyPrice: 70, sellPrice: 120, stock: 30, sizes: 'مقاس واحد', colors: 'متعدد', image: '' }
  ],
  customers: [
    { id: 'c1', name: 'سارة أحمد', phone: '01012345678', address: 'طنطا، شارع البحر' },
    { id: 'c2', name: 'محمد علي', phone: '01123456789', address: 'المحلة الكبرى' },
    { id: 'c3', name: 'مريم حسن', phone: '01234567890', address: 'القاهرة، مدينة نصر' }
  ],
  orders: [
    { id: 'o1025', number: '1025', customerId: 'c1', items: [{ productId: 'p1', name: 'قميص كتان صيفي', qty: 2, unitPrice: 350, unitCost: 200 }], discount: 0, shipping: 50, status: 'تم التسليم', date: '2026-10-18', stockApplied: true },
    { id: 'o1024', number: '1024', customerId: 'c2', items: [{ productId: 'p2', name: 'بلوزة نسائية', qty: 1, unitPrice: 250, unitCost: 150 }], discount: 0, shipping: 35, status: 'قيد التجهيز', date: '2026-10-18', stockApplied: true },
    { id: 'o1023', number: '1023', customerId: 'c3', items: [{ productId: 'p4', name: 'شنطة يد', qty: 1, unitPrice: 450, unitCost: 300 }, { productId: 'p5', name: 'إكسسوارات شعر', qty: 1, unitPrice: 120, unitCost: 70 }], discount: 20, shipping: 0, status: 'تم التأكيد', date: '2026-10-17', stockApplied: false }
  ],
  expenses: [
    { id: 'e1', title: 'تغليف وشحن', category: 'تشغيل', amount: 450, date: '2026-10-16', description: 'مستلزمات تغليف الطلبات' },
    { id: 'e2', title: 'إعلانات ممولة', category: 'تسويق', amount: 700, date: '2026-10-14', description: 'حملة على فيسبوك' }
  ],
  stockMovements: []
}
