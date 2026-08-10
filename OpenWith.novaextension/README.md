**Open With** opens the current Nova workspace or file with one or more apps you configure.

Great for disk usage tools like GrandPerspective, or any other Mac app that accepts a folder or file path.

## Usage

Run from **Extensions** or the Command Palette:

- **Open With…** — open the workspace folder; if multiple apps are configured, pick one (A–Z)
- **Open File With…** — open the current file with a configured app
- **Open With Default App** — open the workspace with the first app in your list, with no picker — ideal for a keyboard shortcut
- **Configure Open With…** — open the extension settings

If only one app is configured, the picker is skipped and that app is used immediately.

## Configuration

Open **Extensions → Extension Library… → Open With → Settings**, or use **Configure Open With…**.

### Apps

A list of `.app` bundles. Defaults to GrandPerspective if installed at `/Applications/GrandPerspective.app`.

The **first** app in this list is used by **Open With Default App**. The multi-app picker is sorted alphabetically by app name.

Examples:

- `/Applications/GrandPerspective.app` — treemap of workspace disk usage
- `/Applications/DaisyDisk.app` — disk space visualizer
- `/System/Library/CoreServices/Finder.app` — reveal workspace in Finder
- `/Applications/Xcode.app` — open workspace in Xcode

Add, remove, or reorder apps with the list controls.
