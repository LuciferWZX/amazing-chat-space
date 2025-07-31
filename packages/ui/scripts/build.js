import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const build = () => {
	try {
		//将index.css文件复制到dist目录下
		const indexCss = path.join(__dirname, "../src/styles/globals.css");
		const themeCss = path.join(__dirname, "../src/styles/theme.css");
		const distIndexCss = path.join(__dirname, "../dist/globals.css");
		const distThemeCss = path.join(__dirname, "../dist/theme.css");
		// 检查源文件是否存在
		if (!fs.existsSync(indexCss)) {
			console.error("❌ Source CSS file does not exist:", indexCss);
			return;
		}
		if (!fs.existsSync(themeCss)) {
			console.error("❌ Theme CSS file does not exist:", themeCss);
			return;
		}

		fs.copyFileSync(indexCss, distIndexCss);
		fs.copyFileSync(themeCss, distThemeCss);
		console.log("✅ CSS file copied successfully", distIndexCss, distThemeCss);
	} catch (error) {
		console.error("❌ Error copying CSS file:", error.message);
	}
};

// 直接执行 build 函数
build();
