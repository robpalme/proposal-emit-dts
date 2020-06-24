# "emitDts": true for exporting handwritten declarations 

## Search Terms

emit .d.ts, handwritten declaration files, Project References, outDir

## Suggestion

Introduce a tsconfig option `"emitDts": true` that will emit `.d.ts` source files into the `outDir`, taking precedence over any `.js`-generated `.d.ts` files.

## Use Cases

### 1. Publishing handwritten declarations

Not everyone has their `outDir` inside their source directory.  Not everyone publishes a combined set of source + generated files to npm.  It's a common pattern to only publish your `outDir`.

The workaround is to have a separate script that copies your handwritten `.d.ts` into your `outDir`, overwriting any unwanted `.js`-generated declarations.
This is workable but a bit cumbersome for such a common use-case.

### 2. Importing another project's `outDir`

Project References allow you to import types a from sibling project's _source_ directory.  If instead you switch to import from the sibling project's **`outDir`** (that is using `"declaration": true`), importing handwritten `.d.ts` fails because they are not emitted.

Why would people link to generated code?  Because it helps simulate the experience of importing published code. 

You can work-around lack of `"emitDts": true` by writing a build-script that copies the desired `d.ts` into the `outdir`.  This works fine for tsc builds.  However for IDEs (using the language service), it doesn't know about the build-script, and so always ignores the hand-written `.d.ts` and favours the `.js`-generated version.  There is no work-around.  Even if you overwrite the file in the `outDir` on disk with a build-script, the language service sees the `.js`-generated version.

## Examples

This repo is an example of how importing handwritten `.d.ts` goes wrong today.
Build it using `tsc -b` and observe...

- [./app-src/app.ts](./app-src/app.ts) should error but it does not.
- [./app-src/app.ts](./app-src/app.ts) incorrectly has access to `hiddenBar` because [./lib-src/main.d.ts](./lib-src/main.d.ts) is being ignored.

## Checklist

My suggestion meets these guidelines:

* [x] This wouldn't be a breaking change in existing TypeScript/JavaScript code
* [x] This wouldn't change the runtime behavior of existing JavaScript code
* [x] This could be implemented without emitting different JS based on the types of the expressions
* [x] This isn't a runtime feature (e.g. library functionality, non-ECMAScript syntax with JavaScript output, etc.)
* [x] This feature would agree with the rest of [TypeScript's Design Goals](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Design-Goals).

