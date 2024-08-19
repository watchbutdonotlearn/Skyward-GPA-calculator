# Skyward-GPA-calculator
> [!IMPORTANT]
> This extension has entered into maintainence mode, and maintainership has passed over to [Mahid Sheikh](https://github.com/StandingPadAnimations/). PRs will be reviewed and accepted, but new features won't be a priority 

This is an extension which injects various scripts into Skyward, to calculate GPA and perform other tasks, such as disabling the idle logout prompt.

# Building
This extension uses `yarn` to manage packages, and is built in Typescript.

To build the extension:
1. Clone the repo
```sh
git clone https://github.com/watchbutdonotlearn/Skyward-GPA-calculator/
```
2. Install the dependencies 
```
yarn install
```
3. Run the `build` command
```
yarn build
```
Type errors are to be expected, as this was ported from a JavaScript project with relaxed use of types.

The outputted extension (including `manifest.json`) will be in `dist`. To package as a FireFox extension, run 
```
yarn package-firefox
```
The outputted extension will be in `web-ext-artifacts`.
