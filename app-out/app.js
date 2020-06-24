foo;
//@ts-expect-error hiddenBar should not be accessible
import { hiddenBar } from "../lib-out/main";
hiddenBar;
//@ts-expect-error hiddenBar should not be accessible
var foo = 1;
