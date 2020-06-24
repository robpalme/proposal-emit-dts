import { foo} from "../lib-out/main";
foo;

// @ts-expect-error The source .d.ts should deny access!
import { hiddenBar} from "../lib-out/main";
hiddenBar;


