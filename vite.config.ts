import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import path, { resolve } from 'path'

export default ({ command, mode }) => {
  // 获取环境变量
  const env: Partial<ImportMeta> = loadEnv(mode, process.cwd());
  return defineConfig({
    define: {
      'process.env': env,
    },
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: '/src/'
        }
      ]
    },
    server: {
      hmr: true,
      open: true,
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-import.d.ts',
        eslintrc: {
          enabled: true,
        },
      }),
      /*    auto resolve third components
            Components({
              resolvers: [],
            }), */
    ],
    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true,
        },
      },
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        }
      }
    },
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer]
      }
    },
  });
};