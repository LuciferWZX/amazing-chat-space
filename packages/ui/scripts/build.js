import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const build = () => {
	try {
		//将index.css文件复制到dist目录下
		const indexCss = path.join(__dirname, "../src/styles/globals.css");
		const distIndexCss = path.join(__dirname, "../dist/globals.css");

		console.log("Source CSS path:", indexCss);
		console.log("Destination CSS path:", distIndexCss);

		// 检查源文件是否存在
		if (!fs.existsSync(indexCss)) {
			console.error("❌ Source CSS file does not exist:", indexCss);
			return;
		}

		fs.copyFileSync(indexCss, distIndexCss);
		console.log("✅ CSS file copied successfully");
	} catch (error) {
		console.error("❌ Error copying CSS file:", error.message);
	}
};

// 直接执行 build 函数
build();
