# Sip MUD Client

Sip is a stand-alone desktop client for MUD (Multi-User Dungeon) gaming.  It is optimized for [CoffeeMUD](http://www.coffeemud.net/), but can be used with others.  Originally launched as a Java AWT client over 20 years ago, Sip has been reimagined for today’s players.

## Features

- ANSI-256: All the colors you could hope for.
- MXP: Pictures, sounds, clickable text, and mini-frames.
- MSP: Sound and Music
- GMCP: Access server information out-of-band.
- MSDP: (ditto)
- Aliases: Customize your commands, or trigger a myriad events with new ones.
- Triggers: Cause a custom action when the mud sends a particular message.
- Scripts (JavaScript): Go wild with customizing your mud client.
- Timers: Cause some action to occur periodically, or after a delay. 
- Plugins: Sweet bundles of Modifications.
- MXP editor: Customize your screen layout or colors, have a window for TELLs, etc. 

## Screenshots

*(Coming Soon)*

## Installation

1. **Download the Executable**:
   - Download `Sip-3.0.0-portable.exe` from [GitHub Releases](https://github.com/bozimmerman/sip/releases)

2. **Run Sip**:
   - Double-click `Sip-3.0.0-portable.exe` to launch the app on Windows. No installation is required—this is a portable executable.

## Usage

1. **Launch Sip**:
   - Run `Sip-3.0.0-portable.exe`.
   - Optionally, use `--debug` to enable DevTools for troubleshooting:
     ```
     Sip-1.0.0-portable.exe --debug
     ```

2. **Connect to CoffeeMUD**:
   - Sip automatically connects to `coffeemud.net:23` (CoffeeMUD’s default telnet port).
   - If using a different server, use the `Connect` menu option under `Window`.

3. **Interact with the MUD**:
   - View server output in the big black area.
   - Enter commands in the input field at the bottom (e.g., `look`, `attack`).

4. **Read the Help**:
   - Help for the several features is available under the `Help` menu.

## Building from Source

If you’d like to modify Sip and build your own `.exe`:

1. **Clone the Repository**:

   svn checkout https://coffeemud.net/public/Sip
   cd Sip

2. **Install Dependencies**:

   npm install

3. **Run in Development**:

   npm start

- Add `--debug` to open DevTools:
  ```
  npm start -- --debug
  ```

4. **Build the .exe**:

   npm run dist

- Outputs `Sip-3.0.0-portable.exe` in the `dist/` folder.

## Known Issues

- **Windows Only**: Currently built for Windows. To support macOS/Linux, modify `package.json` `build` targets and rebuild.
- **Alpha (Barely)**: There are known issues, mostly with connection and phonebook related things.

## Contributing

Sip is a passion project, but contributions are welcome! Fork the repository, make your changes, and contact the author to review your changes.

## License

Sip is released under the [Apache 2.0 License](LICENSE).

## Acknowledgments

- Built with [Electron](https://www.electronjs.org/) for cross-platform desktop support.
- Thanks to the CoffeeMUD community for their support and feedback.

## Contact

For questions, bug reports, or feature requests, reach out via:
- Contact: https://www.zimmers.net/email/form-page.html
- Development Home Page: http://www.coffeemud.org
- Support forum: http://coffeemud.net:27744/forum.cmvp?journal=Support&journalpage=0
- GitHub: [bozimmerman](https://github.com/bozimmerman)

---

Sip: Savor the Experience! ☕

