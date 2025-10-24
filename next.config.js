/** @type {import('next').NextConfig} */
const nextConfig = {
  // Оптимизация производительности
  swcMinify: true,
  compress: true,
  
  // Оптимизация изображений
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Экспериментальные функции для производительности
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    
    // Оптимизация для 3D библиотек
    config.resolve.alias = {
      ...config.resolve.alias,
      'three/examples/jsm': 'three/examples/jsm',
    };
    
    return config;
  },
}

module.exports = nextConfig
