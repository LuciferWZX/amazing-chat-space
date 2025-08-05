import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
//用于路由自动生成的文件，但是我这边是自己写路由，无需生成
// import tanstackRouter from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss()
	],
	server:{
		proxy:{
			"/api":{
				target:"http://localhost:3000",
				changeOrigin:true,
				rewrite:(path)=>path.replace(/^\/api/,''),
			}
		}
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
