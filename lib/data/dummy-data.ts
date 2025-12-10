export interface Customer {
    id: string
    name: string
    mobile: string
    address: string
    landmark: string
    pincode: string
    area: string
    totalOrders: number
    totalSpent: number
}

export interface OrderItem {
    productId: string
    quantity: number
    price: number
}

export interface Order {
    id: string
    customerId: string
    customerName: string
    customerMobile: string
    customerAddress: string
    items: OrderItem[]
    subtotal: number
    deliveryCharge: number
    total: number
    paymentMethod: 'upi' | 'cod'
    paymentStatus: 'paid' | 'pending'
    status: 'placed' | 'packed' | 'outForDelivery' | 'delivered' | 'cancelled'
    date: string
}

export const delhiAreas = [
    'Rohini Sector 7',
    'Rohini Sector 10',
    'Pitampura',
    'Shalimar Bagh',
    'Paschim Vihar',
    'Ashok Vihar',
    'Model Town',
    'Punjabi Bagh'
]

export const delhiPincodes = [
    '110085', // Rohini
    '110088', // Rohini
    '110034', // Pitampura
    '110052', // Shalimar Bagh
    '110063', // Paschim Vihar
    '110052', // Ashok Vihar
    '110009', // Model Town
    '110026'  // Punjabi Bagh
]

export const dummyCustomers: Customer[] = [
    {
        id: 'c1',
        name: 'Rajesh Kumar',
        mobile: '+91 98765 43210',
        address: 'A-45, Sector 7, Rohini',
        landmark: 'Near Metro Station',
        pincode: '110085',
        area: 'Rohini Sector 7',
        totalOrders: 15,
        totalSpent: 8500
    },
    {
        id: 'c2',
        name: 'Priya Sharma',
        mobile: '+91 98765 43211',
        address: 'B-123, Pitampura',
        landmark: 'Opposite Kohat Enclave',
        pincode: '110034',
        area: 'Pitampura',
        totalOrders: 8,
        totalSpent: 4200
    },
    {
        id: 'c3',
        name: 'Amit Singh',
        mobile: '+91 98765 43212',
        address: 'C-67, Shalimar Bagh',
        landmark: 'Near Club Road',
        pincode: '110052',
        area: 'Shalimar Bagh',
        totalOrders: 12,
        totalSpent: 6800
    },
    {
        id: 'c4',
        name: 'Neha Gupta',
        mobile: '+91 98765 43213',
        address: 'D-89, Paschim Vihar',
        landmark: 'Near DDA Park',
        pincode: '110063',
        area: 'Paschim Vihar',
        totalOrders: 20,
        totalSpent: 12500
    },
    {
        id: 'c5',
        name: 'Vikram Malhotra',
        mobile: '+91 98765 43214',
        address: 'E-34, Model Town',
        landmark: 'Near GTB Nagar Metro',
        pincode: '110009',
        area: 'Model Town',
        totalOrders: 6,
        totalSpent: 3200
    }
]

export const dummyOrders: Order[] = [
    {
        id: 'ORD001',
        customerId: 'c1',
        customerName: 'Rajesh Kumar',
        customerMobile: '+91 98765 43210',
        customerAddress: 'A-45, Sector 7, Rohini, Delhi - 110085',
        items: [
            { productId: 'p1', quantity: 1, price: 385 },
            { productId: 'p6', quantity: 4, price: 27 },
            { productId: 'p10', quantity: 5, price: 10 }
        ],
        subtotal: 543,
        deliveryCharge: 30,
        total: 573,
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        status: 'delivered',
        date: '2024-12-05'
    },
    {
        id: 'ORD002',
        customerId: 'c2',
        customerName: 'Priya Sharma',
        customerMobile: '+91 98765 43211',
        customerAddress: 'B-123, Pitampura, Delhi - 110034',
        items: [
            { productId: 'p11', quantity: 10, price: 14 },
            { productId: 'p7', quantity: 2, price: 56 },
            { productId: 'p16', quantity: 3, price: 38 }
        ],
        subtotal: 366,
        deliveryCharge: 30,
        total: 396,
        paymentMethod: 'upi',
        paymentStatus: 'paid',
        status: 'outForDelivery',
        date: '2024-12-10'
    },
    {
        id: 'ORD003',
        customerId: 'c3',
        customerName: 'Amit Singh',
        customerMobile: '+91 98765 43212',
        customerAddress: 'C-67, Shalimar Bagh, Delhi - 110052',
        items: [
            { productId: 'p4', quantity: 1, price: 625 },
            { productId: 'p5', quantity: 2, price: 145 }
        ],
        subtotal: 915,
        deliveryCharge: 0,
        total: 915,
        paymentMethod: 'upi',
        paymentStatus: 'paid',
        status: 'packed',
        date: '2024-12-09'
    },
    {
        id: 'ORD004',
        customerId: 'c4',
        customerName: 'Neha Gupta',
        customerMobile: '+91 98765 43213',
        customerAddress: 'D-89, Paschim Vihar, Delhi - 110063',
        items: [
            { productId: 'p17', quantity: 2, price: 85 },
            { productId: 'p18', quantity: 1, price: 95 },
            { productId: 'p8', quantity: 5, price: 30 }
        ],
        subtotal: 415,
        deliveryCharge: 30,
        total: 445,
        paymentMethod: 'cod',
        paymentStatus: 'pending',
        status: 'placed',
        date: '2024-12-10'
    }
]

export const categories = [
    { id: 'all', nameEn: 'All Products', nameHi: 'सभी उत्पाद' },
    { id: 'groceries', nameEn: 'Groceries', nameHi: 'किराना' },
    { id: 'dairy', nameEn: 'Dairy Products', nameHi: 'डेयरी उत्पाद' },
    { id: 'snacks', nameEn: 'Snacks & Beverages', nameHi: 'स्नैक्स और पेय' },
    { id: 'personalCare', nameEn: 'Personal Care', nameHi: 'व्यक्तिगत देखभाल' },
    { id: 'household', nameEn: 'Household Items', nameHi: 'घरेलू सामान' },
    { id: 'beverages', nameEn: 'Beverages', nameHi: 'पेय पदार्थ' }
]
