# Open With

A [Nova](https://nova.app) extension that opens the current workspace or file with a configured Mac app — the same idea as Finder’s **Open With**.

Configure one or many apps — useful for [GrandPerspective](https://grandperspectiv.sourceforge.net/) to see where workspace filespace is going, and for any other app that accepts a path.

## Usage

Invoke via **Extensions > Open With…**, **Open File With…**, or **Open With Default App**, or search in the Command Palette.

- **Open With…** — opens the workspace folder (picker if multiple apps)
- **Open File With…** — opens the current file
- **Open With Default App** — opens the workspace with the first listed app (good for a key binding)

## More Info

See the internal [README](/OpenWith.novaextension/README.md) for more info.

## Requirements

- Nova 4 or later (`pathArray` preferences)
- At least one configured app (GrandPerspective is the default)

## Licence

[MIT](/LICENSE)
