export interface Product {
    id: string
    nameEn: string
    nameHi: string
    descriptionEn: string
    descriptionHi: string
    price: number
    category: string
    stock: number
    image: string
    brand: string
    weight: string
}

export const products: Product[] = [
    // Groceries
    {
        id: 'p1',
        nameEn: 'Aashirvaad Atta (Whole Wheat Flour)',
        nameHi: 'आशीर्वाद आटा (गेहूं का आटा)',
        descriptionEn: 'Premium quality whole wheat flour for soft rotis',
        descriptionHi: 'नरम रोटियों के लिए प्रीमियम गुणवत्ता वाला गेहूं का आटा',
        price: 385,
        category: 'groceries',
        stock: 45,
        image: '/images/products/aashirvaad-atta.jpg',
        brand: 'Aashirvaad',
        weight: '10 kg'
    },
    {
        id: 'p2',
        nameEn: 'Tata Salt',
        nameHi: 'टाटा नमक',
        descriptionEn: 'Iodized salt for healthy living',
        descriptionHi: 'स्वस्थ जीवन के लिए आयोडीन युक्त नमक',
        price: 22,
        category: 'groceries',
        stock: 120,
        image: '/images/products/tata-salt.jpg',
        brand: 'Tata',
        weight: '1 kg'
    },
    {
        id: 'p3',
        nameEn: 'Fortune Sunflower Oil',
        nameHi: 'फॉर्च्यून सूरजमुखी तेल',
        descriptionEn: 'Refined sunflower oil for healthy cooking',
        descriptionHi: 'स्वस्थ खाना पकाने के लिए रिफाइंड सूरजमुखी तेल',
        price: 185,
        category: 'groceries',
        stock: 30,
        image: '/images/products/fortune-oil.jpg',
        brand: 'Fortune',
        weight: '1 L'
    },
    {
        id: 'p4',
        nameEn: 'India Gate Basmati Rice',
        nameHi: 'इंडिया गेट बासमती चावल',
        descriptionEn: 'Premium aged basmati rice',
        descriptionHi: 'प्रीमियम पुराना बासमती चावल',
        price: 625,
        category: 'groceries',
        stock: 25,
        image: '/images/products/basmati-rice.jpg',
        brand: 'India Gate',
        weight: '5 kg'
    },
    {
        id: 'p5',
        nameEn: 'Toor Dal (Arhar Dal)',
        nameHi: 'तूर दाल (अरहर दाल)',
        descriptionEn: 'Fresh yellow pigeon peas',
        descriptionHi: 'ताजा पीली अरहर दाल',
        price: 145,
        category: 'groceries',
        stock: 50,
        image: '/images/products/toor-dal.jpg',
        brand: 'Local',
        weight: '1 kg'
    },

    // Dairy Products
    {
        id: 'p6',
        nameEn: 'Amul Taaza Toned Milk',
        nameHi: 'अमूल ताज़ा टोंड दूध',
        descriptionEn: 'Fresh toned milk',
        descriptionHi: 'ताज़ा टोंड दूध',
        price: 27,
        category: 'dairy',
        stock: 80,
        image: '/images/products/amul-milk.jpg',
        brand: 'Amul',
        weight: '500 ml'
    },
    {
        id: 'p7',
        nameEn: 'Amul Butter',
        nameHi: 'अमूल मक्खन',
        descriptionEn: 'Utterly butterly delicious',
        descriptionHi: 'बिल्कुल मक्खनी स्वादिष्ट',
        price: 56,
        category: 'dairy',
        stock: 60,
        image: '/images/products/amul-butter.jpg',
        brand: 'Amul',
        weight: '100 g'
    },
    {
        id: 'p8',
        nameEn: 'Mother Dairy Curd',
        nameHi: 'मदर डेयरी दही',
        descriptionEn: 'Fresh and creamy curd',
        descriptionHi: 'ताज़ा और मलाईदार दही',
        price: 30,
        category: 'dairy',
        stock: 40,
        image: '/images/products/mother-dairy-curd.jpg',
        brand: 'Mother Dairy',
        weight: '400 g'
    },
    {
        id: 'p9',
        nameEn: 'Amul Cheese Slices',
        nameHi: 'अमूल चीज़ स्लाइस',
        descriptionEn: 'Processed cheese slices',
        descriptionHi: 'प्रोसेस्ड चीज़ स्लाइस',
        price: 135,
        category: 'dairy',
        stock: 35,
        image: '/images/products/amul-cheese.jpg',
        brand: 'Amul',
        weight: '200 g'
    },

    // Snacks & Beverages
    {
        id: 'p10',
        nameEn: 'Parle-G Biscuits',
        nameHi: 'पारले-जी बिस्कुट',
        descriptionEn: 'India\'s favorite glucose biscuits',
        descriptionHi: 'भारत का पसंदीदा ग्लूकोज बिस्कुट',
        price: 10,
        category: 'snacks',
        stock: 200,
        image: '/images/products/parle-g.jpg',
        brand: 'Parle',
        weight: '100 g'
    },
    {
        id: 'p11',
        nameEn: 'Maggi 2-Minute Noodles',
        nameHi: 'मैगी 2-मिनट नूडल्स',
        descriptionEn: 'Masala flavored instant noodles',
        descriptionHi: 'मसाला स्वाद वाले इंस्टेंट नूडल्स',
        price: 14,
        category: 'snacks',
        stock: 150,
        image: '/images/products/maggi.jpg',
        brand: 'Maggi',
        weight: '70 g'
    },
    {
        id: 'p12',
        nameEn: 'Kurkure Masala Munch',
        nameHi: 'कुरकुरे मसाला मंच',
        descriptionEn: 'Crunchy and spicy snack',
        descriptionHi: 'कुरकुरा और मसालेदार स्नैक',
        price: 20,
        category: 'snacks',
        stock: 100,
        image: '/images/products/kurkure.jpg',
        brand: 'Kurkure',
        weight: '85 g'
    },
    {
        id: 'p13',
        nameEn: 'Haldiram\'s Bhujia',
        nameHi: 'हल्दीराम भुजिया',
        descriptionEn: 'Crispy and tasty namkeen',
        descriptionHi: 'कुरकुरा और स्वादिष्ट नमकीन',
        price: 45,
        category: 'snacks',
        stock: 70,
        image: '/images/products/haldiram-bhujia.jpg',
        brand: 'Haldiram\'s',
        weight: '200 g'
    },
    {
        id: 'p14',
        nameEn: 'Coca-Cola',
        nameHi: 'कोका-कोला',
        descriptionEn: 'Refreshing cold drink',
        descriptionHi: 'ताज़गी भरा कोल्ड ड्रिंक',
        price: 40,
        category: 'beverages',
        stock: 90,
        image: '/images/products/coca-cola.jpg',
        brand: 'Coca-Cola',
        weight: '750 ml'
    },
    {
        id: 'p15',
        nameEn: 'Bru Instant Coffee',
        nameHi: 'ब्रू इंस्टेंट कॉफी',
        descriptionEn: 'Premium instant coffee',
        descriptionHi: 'प्रीमियम इंस्टेंट कॉफी',
        price: 225,
        category: 'beverages',
        stock: 40,
        image: '/images/products/bru-coffee.jpg',
        brand: 'Bru',
        weight: '200 g'
    },

    // Personal Care
    {
        id: 'p16',
        nameEn: 'Dettol Soap',
        nameHi: 'डेटॉल साबुन',
        descriptionEn: 'Antibacterial bathing soap',
        descriptionHi: 'जीवाणुरोधी नहाने का साबुन',
        price: 38,
        category: 'personalCare',
        stock: 85,
        image: '/images/products/dettol-soap.jpg',
        brand: 'Dettol',
        weight: '125 g'
    },
    {
        id: 'p17',
        nameEn: 'Colgate Toothpaste',
        nameHi: 'कोलगेट टूथपेस्ट',
        descriptionEn: 'Strong teeth, healthy gums',
        descriptionHi: 'मजबूत दांत, स्वस्थ मसूड़े',
        price: 85,
        category: 'personalCare',
        stock: 95,
        image: '/images/products/colgate.jpg',
        brand: 'Colgate',
        weight: '200 g'
    },
    {
        id: 'p18',
        nameEn: 'Clinic Plus Shampoo',
        nameHi: 'क्लिनिक प्लस शैम्पू',
        descriptionEn: 'Strong and long hair',
        descriptionHi: 'मजबूत और लंबे बाल',
        price: 95,
        category: 'personalCare',
        stock: 60,
        image: '/images/products/clinic-plus.jpg',
        brand: 'Clinic Plus',
        weight: '340 ml'
    },
    {
        id: 'p19',
        nameEn: 'Lux Soap',
        nameHi: 'लक्स साबुन',
        descriptionEn: 'Soft and glowing skin',
        descriptionHi: 'कोमल और चमकदार त्वचा',
        price: 35,
        category: 'personalCare',
        stock: 75,
        image: '/images/products/lux-soap.jpg',
        brand: 'Lux',
        weight: '125 g'
    },
    {
        id: 'p20',
        nameEn: 'Surf Excel Quick Wash',
        nameHi: 'सर्फ एक्सेल क्विक वॉश',
        descriptionEn: 'Detergent powder for quick wash',
        descriptionHi: 'जल्दी धोने के लिए डिटर्जेंट पाउडर',
        price: 285,
        category: 'household',
        stock: 30,
        image: '/images/products/surf-excel.jpg',
        brand: 'Surf Excel',
        weight: '2 kg'
    },
]

export function getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
    if (category === 'all') return products
    return products.filter(p => p.category === category)
}

export function searchProducts(query: string): Product[] {
    const lowerQuery = query.toLowerCase()
    return products.filter(p =>
        p.nameEn.toLowerCase().includes(lowerQuery) ||
        p.nameHi.includes(query) ||
        p.brand.toLowerCase().includes(lowerQuery)
    )
}
