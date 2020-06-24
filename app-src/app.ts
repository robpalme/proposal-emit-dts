import { foo } from "../lib-out/main";
foo;
//@ts-expect-error hiddenBar should not be accessible
import { hiddenBar } from "../lib-out/main";
hiddenBar;
