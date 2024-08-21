# Skyward-GPA-calculator
> [!IMPORTANT]
> This extension has entered into maintainence mode, and maintainership has passed over to [Mahid Sheikh](https://github.com/StandingPadAnimations/). PRs will be reviewed and accepted, but new features won't be a priority 
> 
> A rewrite to TypeScript is also in progress to make this more maintainable for future developers. Check the `rewrite` branch for progress on the rewrite.

This is an extension which injects various scripts into Skyward, to calculate GPA and perform other tasks, such as disabling the idle logout prompt.

# Installing
## Chrome
1. [Download the latest version of the extension](https://github.com/watchbutdonotlearn/Skyward-GPA-calculator/releases/download/0.12/skyward_gpa_calculator_-_and_more-0.12.zip)
2. Find the downloaded ZIP file in your downloads folder. Right click on it and extract the files. 
3. Go to [chrome://extensions](chrome://extensions) in your chrome browser.
4. Enable Developer mode by flipping the switch in the upper-right corner of your screen.
5. Now, click on the "Load unpacked" button in the upper-left side of the screen.
6. Navigate to the directory which you downloaded the extension to, and click on the folder containing the extension.

As of right now there are no plans on uploading this extension to the Chrome Web Store due to it requiring a 5 dollar fee for developers.

## FireFox
If you are on Firefox, the installation process is much easier! The extension can be installed from [here](https://addons.mozilla.org/en-US/firefox/addon/skyward-gpa-calculator/).

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
