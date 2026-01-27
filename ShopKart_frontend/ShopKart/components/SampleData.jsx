import male1_navbg from '../assets/images/male1_navbg.jpg';
import male2_navbg from '../assets/images/male2_navbg.jpg';
import summer_sale from '../assets/images/summer_sale.jpg';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import male from '../assets/images/male.jpg';
import women from '../assets/images/women.jpg';
import kids from '../assets/images/kids.jpg';
import access from '../assets/images/access.jpg';

import shirt from '../assets/images/shirt.jpg';
import whiteshirt from '../assets/images/whiteshirt.jpg';
import one from '../assets/images/1.jpg';
import three from '../assets/images/3.jpg';
import four from '../assets/images/4.jpg';
import five from '../assets/images/5.jpg';
import six from '../assets/images/6.jpg';
import seven from '../assets/images/7.jpg';
import eight from '../assets/images/8.jpg';
import tshirt from '../assets/images/tshirt.jpg';

import dress from '../assets/images/dress.jpg';
import skirt from '../assets/images/skirt.jpg';
import jeans from '../assets/images/jeans.jpg';
import tops from '../assets/images/tops.jpg';
import boys from '../assets/images/boys.jpg';
import girls from '../assets/images/girls.jpg';
import cap from '../assets/images/cap.jpg';
import belt from '../assets/images/belt.jpg';
import bag from '../assets/images/bags.jpg';
import shoe from '../assets/images/shoes.jpg';
import school from '../assets/images/school.jpg';

export const slides = [
  {
    img: male1_navbg,
    headline: 'TIMELESS\nFASHION',
    subheading:
      'Elevate your wardrobe\nwith premium clothing\ndesigned for\nelegance.',
    cta: { text: 'BestSellers', href: '/new' },
  },
  {
    img: male2_navbg,
    headline: 'DISCOVER\nSOMETHING\nNEW',
    subheading:
      'A modern and minimalist\ncollection of clothing for\nthe shopper.',
    cta: { text: 'View', href: '/bestsellers' },
  },
  {
    img: summer_sale,
    headline: 'NEW ARRIVALS',
    subheading:
      'A modern and\n minimalist\ncollection of\nclothing\nfor the\nshopper.',
    cta: { text: 'View', href: '/workwear' },
  },
];

export const banners = [
  {
    icon: <FontAwesome5 name="truck" size={28} color="#0d6efd" />,
    title: 'Free Shipping',
    subtitle: 'Orders over 500',
  },
  {
    icon: <FontAwesome name="shield" size={28} color="#198754" />,
    title: 'Secure Payment',
    subtitle: 'UPI / Cards / Wallet',
  },
  {
    icon: <FontAwesome5 name="undo-alt" size={28} color="#dc3545" />,
    title: '30 Days Return',
    subtitle: 'Easy return policy',
  },
  {
    icon: <MaterialIcons name="headset-mic" size={28} color="#ffc107" />,
    title: '24/7 Support',
    subtitle: 'We’re here anytime',
  },
];

export const categgoryTiles = [
  {
    label: 'MEN',
    cat: 'Men',
    image: male,
    sub: [
      { name: 'T-Shirts', image: tshirt },
      { name: 'Shirts', image: shirt },
      { name: 'Jeans', image: jeans },
    ],
  },
  {
    label: 'WOMEN',
    cat: 'Women',
    image: women,
    sub: [
      { name: 'Dresses', image: dress },
      { name: 'Tops', image: tops },
      { name: 'Skirts', image: skirt },
      { name: 'Jeans', image: jeans },
    ],
  },
  {
    label: 'KIDS',
    cat: 'Kids',
    image: kids,
    sub: [
      { name: 'Boys', image: boys },
      { name: 'Girls', image: girls },
      { name: 'School Wear', image: school },
    ],
  },
  {
    label: 'ACCESSORIES',
    cat: 'Accessories',
    image: access,
    sub: [
      { name: 'Bags', image: bag },
      { name: 'Caps', image: cap },
      { name: 'Belts', image: belt },
      { name: 'Shoes', image: shoe },
    ],
  },
];

export const PRODUCTS = [
  {
    id: 1,
    category: 'MEN',
    subCategory: 'Jeans',
    title: "Men's Jeans Collection Street Style",
    description:
      'Premium denim jeans crafted for durability and comfort. Slim-fit, mid-rise with stretch fabric for all-day wear.',
    images: [one, one],
    price: 2530,
    was: 3700,
    rating: 4.9,
    reviews: 432,
    sold: '10k+',
    colors: ['Black', 'Blue', 'Grey'],
    sizes: ['28', '30', '32', '34', '36'],
    sku: 'JEANS-MEN-001',
    stock: 120,
    materials: '98% Cotton, 2% Elastane',
    care: 'Machine wash cold, tumble dry low',
    tags: ['best', 'official'],
  },
  {
    id: 2,
    category: 'MEN',
    subCategory: 'T-Shirts',
    title: "Essentials Men's Oxford T-Shirt",
    description:
      'Soft cotton Oxford T-shirt with a breathable weave. Designed for casual and semi-formal occasions.',
    images: [whiteshirt, whiteshirt],
    price: 1790,
    rating: 4.5,
    reviews: 318,
    sold: '10k+',
    colors: ['White', 'Blue', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'TEE-OXFORD-002',
    stock: 75,
    materials: '100% Cotton',
    care: 'Machine wash warm, hang dry',
    tags: ['best', 'style'],
  },
  {
    id: 3,
    category: 'KIDS',
    subCategory: 'Boys',
    title: "Kid's Fashionable Combo Pair",
    description:
      'Trendy kidswear set including a graphic T-shirt and shorts. Lightweight and perfect for all-day play.',
    images: [three, three],
    price: 1990,
    was: 2650,
    rating: 4.2,
    reviews: 220,
    sold: '8k+',
    colors: ['Red', 'Yellow', 'Blue'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'],
    sku: 'KIDS-COMBO-003',
    stock: 64,
    materials: 'Cotton blend',
    care: 'Machine wash gentle',
    tags: ['discount', 'coveted'],
  },
  {
    id: 4,//9
    category: 'KIDS',
    subCategory: 'Girls',
    title: 'Cotton Colourblock Hooded Shorts Set',
    description:
      'Comfortable cotton hooded top and shorts set with a stylish colorblock design.',
    images: [four, four],
    price: 1200,
    rating: 4.8,
    reviews: 145,
    sold: '5k+',
    colors: ['Blue/White', 'Green/Black'],
    sizes: ['S', 'M', 'L'],
    sku: 'HOOD-SHORT-004',
    stock: 48,
    materials: '100% Cotton',
    care: 'Machine wash cold, line dry',
    tags: ['official', 'best'],
  },
  {
    id: 5,
    category: 'ACCESSORIES',
    subCategory: 'Shoes',
    title: "ClassicGent Men's Formal Shoes",
    description:
      'Premium leather lace-up shoes for formal and business occasions. Hand-stitched with cushioned insole.',
    images: [five, five],
    price: 1990,
    rating: 4.2,
    reviews: 180,
    sold: '4k+',
    colors: ['Black', 'Brown'],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    sku: 'FORMAL-SHOE-005',
    stock: 95,
    materials: 'Genuine Leather upper, Rubber sole',
    care: 'Polish regularly, avoid water',
    tags: ['style', 'coveted'],
  },
  {
    id: 6,
    category: 'WOMEN',
    subCategory: 'Dresses',
    title: 'Women Fit & Flare Dress with Puff Sleeves',
    description:
      'Elegant puff sleeve dress with a flared hem, made for evening wear and special occasions.',
    images: [six, six],
    price: 1620,
    rating: 4.1,
    reviews: 205,
    sold: '2k+',
    colors: ['Black', 'Red', 'Pink'],
    sizes: ['XS', 'S', 'M', 'L'],
    sku: 'DRESS-FNF-006',
    stock: 36,
    materials: 'Polyester blend',
    care: 'Dry clean only',
    tags: ['discount'],
  },
  {
    id: 7,
    category: 'WOMEN',
    subCategory: 'Jeans',
    title: "ChicCarry – Elegant Women's Tote Collection",
    description:
      "Luxurious women's tote bags crafted with premium faux leather. Spacious compartments with a minimalist finish.",
    images: [seven, seven],
    price: 6500,
    rating: 4.6,
    reviews: 89,
    sold: '500+',
    colors: ['Beige', 'Black', 'Brown'],
    sizes: ['One Size'],
    sku: 'TOTE-WOMEN-007',
    stock: 22,
    materials: 'PU Leather',
    care: 'Wipe with soft cloth',
    tags: ['official', 'coveted'],
  },
  {
    id: 8,
    category: 'WOMEN',
    subCategory: 'Jackets',
    title: "Sophisticated Women's Parka Line",
    description:
      "Warm and stylish women's parka with faux fur hood. Ideal for winter and outdoor activities.",
    images: [eight, eight],
    price: 3240,
    was: 6500,
    rating: 4.9,
    reviews: 112,
    sold: '100+',
    colors: ['Khaki', 'Navy Blue', 'Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    sku: 'PARKA-WOMEN-008',
    stock: 28,
    materials: 'Polyester shell, faux fur lining',
    care: 'Hand wash cold, hang dry',
    tags: ['style', 'discount'],
  },
];
