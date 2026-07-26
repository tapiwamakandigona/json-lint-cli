# json-lint-cli

Fast JSON validator and formatter CLI tool built with TypeScript.

## Features

- **Validate** JSON files and report syntax errors with line numbers
- **Format** JSON files in place with configurable indentation
- **Quiet mode** to suppress output for valid files (useful in CI)
- Exits with code `1` if any file has errors — integrates easily into CI pipelines
- Zero runtime dependencies

## Installation

```bash
npm install -g json-lint-cli
```

Or run directly with `npx`:

```bash
npx json-lint-cli <file...>
```

## Usage

```bash
json-lint [options] <file...>
```

### Options

| Flag         | Description                              |
| ------------ | ---------------------------------------- |
| `--format`   | Format and overwrite files in place      |
| `--indent N` | Set indentation level (default: `2`)     |
| `--quiet`    | Only show errors (suppress valid output) |
| `--help`     | Show usage information                   |

### Examples

Validate one or more JSON files:

```bash
json-lint config.json data.json
# ✓ config.json
# ✓ data.json
```

Validate and format with 4-space indentation:

```bash
json-lint --format --indent 4 config.json
# ✓ config.json
#   Formatted with indent=4
```

Quiet mode (only errors):

```bash
json-lint --quiet *.json
# (no output if all files are valid)
```

## Development

### Prerequisites

- Node.js ≥ 20 (see `.nvmrc`)

### Setup

```bash
git clone https://github.com/tapiwamakandigona/json-lint-cli.git
cd json-lint-cli
npm install
```

### Build

```bash
npm run build
```

Compiles TypeScript from `src/` to `dist/`.

### Test

```bash
npm test
```

### Project Structure

```
json-lint-cli/
├── src/
│   ├── index.ts         # CLI entry point and core logic
│   └── index.test.ts    # Integration tests
├── dist/                # Compiled output (generated)
├── .github/
│   ├── workflows/
│   │   ├── ci.yml       # CI pipeline (build + test)
│   │   └── release.yml  # Multi-platform release builds
│   └── dependabot.yml   # Automated dependency updates
├── tsconfig.json
├── jest.config.js
├── package.json
└── README.md
```

## License

[MIT](LICENSE)
