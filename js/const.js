"use strict";

const categories = [
    {
        title: "Monitores",
        description: "Los mejores monitores del mercado"
    },
    {
        title: "Tarjetas Graficas",
        description: "Las tarjetas Graficas mas economicas"
    },
    {
        title: "Ordenadores",
        description: "Los ordenadores mas completos"
    },
    {
        title: "Samsung",
        description: "Productos Samsung"
    },
    {
        title: "Asus",
        description: "Productos Asus"
    },
    {
        title: "Lenovo",
        description: "Productos Lenovo"
    },
    {
        title: "MSI",
        description: "Productos MSI"
    }
];

const shops = [
    {
        shop: {
            cif: "0000000ZZZZZZZ",
            name: "AlmacenGeneral",
            phone: "926212325",
            address: "Calle General",
            coords: { longitud: 1, latitud: 1 }
        },
        products: [
            {
                product: {
                    name: "Samsung CF390",
                    price: 170,
                    inchs: 24,
                    pattent: "Samsung",
                    tax: 0.21,
                    description: "Resolucion de 1920x1080 con una curvatura de 1800R.\n El modo gaming optimiza al instante los colores y el contraste de la pantalla.",
                    image: "./images/samsungScreen.jpg",
                    tProduct: "Screen"
                },
                categories: [{
                    title: "Monitores",
                    description: "Los mejores monitores del mercado"
                },
                {
                    title: "Samsung",
                    description: "Productos Samsung"
                }],
                stock: 17

            },
            {
                product: {
                    name: "Asus VS278H",
                    price: 194,
                    inchs: 27,
                    pattent: "Asus",
                    tax: 0.21,
                    description: "Resolucion de 1920x1080 con un tiempo de respuesta de 1ms",
                    image: "./images/asusScreen.jpg",
                    tProduct: "Screen"
                },
                categories: [{
                    title: "Monitores",
                    description: "Los mejores monitores del mercado"
                },
                {
                    title: "Asus",
                    description: "Productos Asus"
                }],
                stock: 6
            },
            {
                product: {
                    name: "ASUS RX550-4G Radeon",
                    price: 122,
                    type: "GDDR5",
                    tax: 0.21,
                    description: "Familia de procesadores AMD con una resolucion maxima de 5120x2880, una memoria de 4GB y puertos HDMI, DVI-D y DisplayPort",
                    image: "./images/asusGraficCard.png",
                    tProduct: "GraficCards"
                },
                categories: [{
                    title: "Tarjetas Graficas",
                    description: "Las tarjetas Graficas mas economicas"
                },
                {
                    title: "Asus",
                    description: "Productos Asus"
                }],
                stock: 12
            },
            {
                product: {
                    name: "Gigabyte GTX 1060 WINDFORCE OC",
                    price: 259.90,
                    type: "GDDR5",
                    tax: 0.21,
                    description: "Familia de procesadores NVIDIA con una resolucion maxima de 7680x4320px, una memoria de 4GB y puertos HDMI, DisplayPort y DVI-D",
                    image: "./images/GigabyteGraficCard.png",
                    tProduct: "GraficCards"
                },
                categories: [{
                    title: "Tarjetas Graficas",
                    description: "Las tarjetas Graficas mas economicas"
                }
                ],
                stock: 6
            },
            {
                product: {
                    name: "LENOVO",
                    price: 853,
                    rom: "8GB",
                    processor: "Intel Core I7-7700K 4.2GHz",
                    tax: 0.21,
                    description: "Ordenador de mesa, completo con un procesador potente",
                    image: "./images/lenovoComputer.png",
                    tProduct: "Computer"
                },
                categories: [{
                    title: "Ordenadores",
                    description: "Los ordenadores mas completos"
                }
                ],
                stock: 10
            },
            {
                product: {
                    name: "MSI Aegis 3 7RB-044EU",
                    price: 1299,
                    rom: "8GB",
                    processor: "Intel Core i7-7700",
                    tax: 0.21,
                    description: "Déjate transportar a una nueva dimensión en juegos virtuales con el PC gaming MSI Aegis 3 7RB-044EU y disfruta de un rendimiento supremo como nunca lo has visto antes. Componentes de lujo y diseño espectacular aúnan fuerzas para que tengas una máquina perfecta.",
                    image: "./images/msiComputer.jpg",
                    tProduct: "Computer"
                },
                categories: [{
                    title: "Ordenadores",
                    description: "Los ordenadores mas completos"
                },
                {
                    title: "MSI",
                    description: "Productos MSI"
                }
                ],
                stock: 3
            }
        ]
    },
    {
        shop: {
            cif: "1111111AAAAAAA",
            name: "LaTiendaEnTuCasa",
            phone: "666111222",
            address: "Calle Tienda 2",
            coords: { longitud: 2, latitud: 2 }
        },
        products: [
            {
                product: {
                    name: "Samsung CF390",
                    price: 170,
                    inchs: 24,
                    pattent: "Samsung",
                    tax: 0.21,
                    description: "Resolucion de 1920x1080 con una curvatura de 1800R.\n El modo gaming optimiza al instante los colores y el contraste de la pantalla.",
                    image: "./images/samsungScreen.jpg",
                    tProduct: "Screen"
                },
                categories: [{
                    title: "Monitores",
                    description: "Los mejores monitores del mercado"
                },
                {
                    title: "Samsung",
                    description: "Productos Samsung"
                }],
                stock: 10

            },
            {
                product: {
                    name: "Asus VS278H",
                    price: 194,
                    inchs: 27,
                    pattent: "Asus",
                    tax: 0.21,
                    description: "Resolucion de 1920x1080 con un tiempo de respuesta de 1ms",
                    image: "./images/asusScreen.jpg",
                    tProduct: "Screen"
                },
                categories: [{
                    title: "Monitores",
                    description: "Los mejores monitores del mercado"
                },
                {
                    title: "Asus",
                    description: "Productos Asus"
                }],
                stock: 7
            },
            {
                product: {
                    name: "ASUS RX550-4G Radeon",
                    price: 122,
                    type: "GDDR5",
                    tax: 0.21,
                    description: "Familia de procesadores AMD con una resolucion maxima de 5120x2880, una memoria de 4GB y puertos HDMI, DVI-D y DisplayPort",
                    image: "./images/asusGraficCard.png",
                    tProduct: "GraficCards"
                },
                categories: [{
                    title: "Tarjetas Graficas",
                    description: "Las tarjetas Graficas mas economicas"
                },
                {
                    title: "Asus",
                    description: "Productos Asus"
                }],
                stock: 15
            },
            {
                product: {
                    name: "Gigabyte GTX 1060 WINDFORCE OC",
                    price: 259.90,
                    type: "GDDR5",
                    tax: 0.21,
                    description: "Familia de procesadores NVIDIA con una resolucion maxima de 7680x4320px, una memoria de 4GB y puertos HDMI, DisplayPort y DVI-D",
                    image: "./images/GigabyteGraficCard.png",
                    tProduct: "GraficCards"
                },
                categories: [{
                    title: "Tarjetas Graficas",
                    description: "Las tarjetas Graficas mas economicas"
                }
                ],
                stock: 3
            }
        ]
    },
    {
        shop: {
            cif: "2222222BBBBBBB",
            name: "MicroTiendasOnline",
            phone: "666333444",
            address: "Calle Tienda 2",
            coords: { longitud: 3, latitud: 3 }
        },
        products: [
            {
                product: {
                    name: "Samsung CF390",
                    price: 170,
                    inchs: 24,
                    pattent: "Samsung",
                    tax: 0.21,
                    description: "Resolucion de 1920x1080 con una curvatura de 1800R.\n El modo gaming optimiza al instante los colores y el contraste de la pantalla.",
                    image: "./images/samsungScreen.jpg",
                    tProduct: "Screen"
                },
                categories: [{
                    title: "Monitores",
                    description: "Los mejores monitores del mercado"
                },
                ],
                stock: 6

            },
            {
                product: {
                    name: "Asus VS278H",
                    price: 194,
                    inchs: 27,
                    pattent: "Asus",
                    tax: 0.21,
                    description: "Resolucion de 1920x1080 con un tiempo de respuesta de 1ms",
                    image: "./images/asusScreen.jpg",
                    tProduct: "Screen"
                },
                categories: [{
                    title: "Monitores",
                    description: "Los mejores monitores del mercado"
                },
                ],
                stock: 16
            },
            {
                product: {
                    name: "Gigabyte GTX 1060 WINDFORCE OC",
                    price: 259.90,
                    type: "GDDR5",
                    tax: 0.21,
                    description: "Familia de procesadores NVIDIA con una resolucion maxima de 7680x4320px, una memoria de 4GB y puertos HDMI, DisplayPort y DVI-D",
                    image: "./images/GigabyteGraficCard.png",
                    tProduct: "GraficCards"
                },
                categories: [{
                    title: "Tarjetas Graficas",
                    description: "Las tarjetas Graficas mas economicas"
                }
                ],
                stock: 5
            },
            {
                product: {
                    name: "LENOVO",
                    price: 853,
                    rom: "8GB",
                    processor: "Intel Core I7-7700K 4.2GHz",
                    tax: 0.21,
                    description: "Ordenador de mesa, completo con un procesador potente",
                    image: "./images/lenovoComputer.png",
                    tProduct: "Computer"
                },
                categories: [{
                    title: "Ordenadores",
                    description: "Los ordenadores mas completos"
                },
                {
                    title: "Lenovo",
                    description: "Productos Lenovo"
                }
                ],
                stock: 23
            }
        ]
    },
    {
        shop: {
            cif: "3333333CCCCCCC",
            name: "ComputersForUs",
            phone: "666555777",
            address: "Calle Tienda 3",
            coords: { longitud: 4, latitud: 4 }
        },
        products: [
            {
                product: {
                    name: "Samsung CF390",
                    price: 170,
                    inchs: 24,
                    pattent: "Samsung",
                    tax: 0.21,
                    description: "Resolucion de 1920x1080 con una curvatura de 1800R.\n El modo gaming optimiza al instante los colores y el contraste de la pantalla.",
                    image: "./images/samsungScreen.jpg",
                    tProduct: "Screen"
                },
                categories: [{
                    title: "Monitores",
                    description: "Los mejores monitores del mercado"
                }
                ],
                stock: 13

            },
            {
                product: {
                    name: "Asus VS278H",
                    price: 194,
                    inchs: 27,
                    pattent: "Asus",
                    tax: 0.21,
                    description: "Resolucion de 1920x1080 con un tiempo de respuesta de 1ms",
                    image: "./images/asusScreen.jpg",
                    tProduct: "Screen"
                },
                categories: [
                {
                    title: "Asus",
                    description: "Productos Asus"
                }],
                stock: 9
            },
            {
                product: {
                    name: "LENOVO",
                    price: 853,
                    rom: "8GB",
                    processor: "Intel Core I7-7700K 4.2GHz",
                    tax: 0.21,
                    description: "Ordenador de mesa, completo con un procesador potente",
                    image: "./images/lenovoComputer.png",
                    tProduct: "Computer"
                },
                categories: [{
                    title: "Ordenadores",
                    description: "Los ordenadores mas completos"
                }
                ],
                stock: 17
            },
            {
                product: {
                    name: "MSI Aegis 3 7RB-044EU",
                    price: 1299,
                    rom: "8GB",
                    processor: "Intel Core i7-7700",
                    tax: 0.21,
                    description: "Déjate transportar a una nueva dimensión en juegos virtuales con el PC gaming MSI Aegis 3 7RB-044EU y disfruta de un rendimiento supremo como nunca lo has visto antes. Componentes de lujo y diseño espectacular aúnan fuerzas para que tengas una máquina perfecta.",
                    image: "./images/msiComputer.jpg",
                    tProduct: "Computer"
                },
                categories: [{
                    title: "Ordenadores",
                    description: "Los ordenadores mas completos"
                },
                {
                    title: "MSI",
                    description: "Productos MSI"
                }
                ],
                stock: 12
            }
        ]
    },
    
    
];