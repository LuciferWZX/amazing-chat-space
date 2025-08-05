import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const build = () => {
	//执行tsup的复制styles的命令
	execSync("tsup && tsup src/styles/* --out-dir dist/styles");
};

// 直接执行 build 函数
build();
