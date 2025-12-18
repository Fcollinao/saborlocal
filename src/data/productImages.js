// src/data/productImages.js
// Mapeo de imágenes de productos por nombre
// Las imágenes están en public/images/products/

export const productImageMap = {
  'Queso Fresco': '/images/products/queso-fresco.png',
  'Mermelada de Frutilla': '/images/products/mermelada-frutilla.png',
  'Pan masa madre': '/images/products/pan-masa-madre.png',
  'Mermelada de Frambuesa': '/images/products/mermelada-frambuesa.png',
  'Bebida Probiotica Kefir': '/images/products/bebida-probiotica-kefir.png',
  'Mantequilla de Campo': '/images/products/mantequilla-campo.png',
  'Café de grano tostado': '/images/products/cat-cafe-en-grano.png',
  'Leche de campo entera': '/images/products/Botella-y-vaso-leche_1024x1024.png',
  'Mermelada de frutos rojos': '/images/products/450_1000.png',
  'Mix de Pimientas del Mundo': '/images/products/Mix_4_pimientas_copy.png',
  'Sal de Mar con Hierbas': '/images/products/Finas_hiervas_copy.png',
  'Merkén Ahumado Artesanal': '/images/products/merken_20240916_094710_0000-dfc0a668b38433767f17264909163515-640-0.png',
  'Mezcla para Asado Campesino': '/images/products/Pack_Asado_Regalo_copy.png',
  'Cúrcuma Molida Orgánica': '/images/products/640.png',
  'Orégano de Cordillera': '/images/products/images.png',
};

// Función para obtener imagen de un producto
export const getProductImage = (productName) => {
  return productImageMap[productName] || '/images/products/placeholder.png';
};
