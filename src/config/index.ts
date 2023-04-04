import dev from "./dev";
import test from "./test";
import prod from "./prod";
import type { IConfig } from "./types";

const config: IConfig = import.meta.env.MODE == "development" ? dev : import.meta.env.MODE == "test" ? test : prod;

export default config
