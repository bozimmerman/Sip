# Sip MUD Client

Sip is a stand-alone desktop client for MUD (Multi-User Dungeon) gaming.  It is optimized for [CoffeeMUD](http://www.coffeemud.net/), but can be used with others.  Originally launched as a Java AWT client over 20 years ago, Sip has been re-imagined for the latest tech and protocols.

## Features

- ANSI-TRUE: All the colors you could hope for.
- MXP: Pictures, sounds, clickable text, and mini-frames.
- MSP: Sound and Music
- GMCP: Access server information out-of-band + Client.Login, Client.Media.
- MSDP: Access server information out-of-band
- Aliases: Customize your commands, or trigger a myriad of events.
- Triggers: Cause a custom action when the mud sends a particular message.
- Scripts (JavaScript): Go wild with customizing your mud client.
- Timers: Cause some action to occur periodically, or after a delay. 
- MXP editor: Customize your screen layout or colors, have a window for TELLs, etc. 
- Media: Local images and sounds for your custom GUI.
- Mapper: Built in API for building interactive visual area maps.
- Plugins: Sweet bundles of all the above and media and more.

## Screenshots

![Sip Screen](https://zimmers.net/home/mud/sip2.jpg)

## Binaries
 - Sip-3.3.1.linux.AppImage (Linux Ubuntu 18.04+, Debian 10+, Fedora 32+, or equivalents)
 - Sip-3.3.1.linux.deb  (Debian-based Linux Ubuntu 18.04+, Debian 10+, or Mint 19+, 64-bit)
 - Sip-3.3.1.linux.rpm  (RPM-based Linux Fedora 32+, CentOS 8+, or openSUSE Leap 15.2+, 64-bit)
 - Sip-3.3.1.mac.dmg (macOS 10.15+ x64 and arm64)
 - Sip-3.3.1.mac.zip (macOS 10.15+ x64 and arm64)
 - Sip-3.3.1.win64.exe (Windows 10 64-bit)
 - Sip-3.3.1.win32.exe (Windows 10 32-bit)

## Installation

1. **Download the Executable**:
   - Download `Sip-3.3.1.win64.exe` from [GitHub Releases](https://github.com/bozimmerman/sip/releases)

2. **Run Sip**:
   - Double-click `Sip-3.3.1.win64.exe` to launch the app on Windows. No installation is required—this is a portable executable.

## Usage

1. **Launch Sip**:
   - Run `Sip-3.3.1.win64.exe`.
   - Optionally, use `--dev` to enable DevTools for troubleshooting:
     ```
     Sip-3.3.1.win64.exe --dev
     ```

2. **Connect to CoffeeMUD**:
   - Sip automatically connects to `coffeemud.net:23` (CoffeeMUD’s default telnet port).
   - If using a different server, use the `Connect` menu option under `Window`.

3. **Interact with the MUD**:
   - View server output in the big black area.
   - Enter commands in the input field at the bottom (e.g., `look`, `attack`).

4. **Read the Help**:
   - Help for the several features is available under the `Help` menu.

5. ** Launch from Source**
   - npm start -- --dev --disable-gpu --no-sandbox

## Building from Source

If you’d like to modify Sip and build your own `.exe`:

1. **Clone the Repository**:

   svn checkout https://coffeemud.net/public/Sip
   
   cd Sip

2. **Install Dependencies**:

   npm install

3. **Run in Development**:

   npm start

- Add `--dev` to open DevTools:
  ```
  npm start -- --dev
  ```

4. **Build the .exe**:

   npm run dist:win
   
or

   npm run dist:mac

or

   npm run dist:linux

- Outputs e.g. `Sip-3.3.1.win64.exe` in the `dist/` folder.

## Known Issues

- None at the moment.

## Contributing

Sip is a passion project, but contributions are welcome! Fork the repository, make your changes, and contact the author to review your changes (no pull requests, please).

## License

Sip is Copyright by Bo Zimmerman, and released under the [Apache 2.0 License](LICENSE).

## Acknowledgments

- Built with [Electron](https://www.electronjs.org/) for cross-platform desktop support.
- Thanks to the CoffeeMUD community for their support and feedback.
- CodeMirror.js is included under the MIT License. https://github.com/codemirror/CodeMirror.
- All images are courtesy of various public domain/CCO libraries.

## Contact

For questions, bug reports, or feature requests, reach out via:
- Contact: https://www.zimmers.net/email/form-page.html
- Development Home Page: http://www.coffeemud.org
- Support forum: http://coffeemud.net:27744/forum.cmvp?journal=Support&journalpage=0
- GitHub: [bozimmerman](https://github.com/bozimmerman)

---

Sip: Savor the Experience! ☕


