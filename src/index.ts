#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";

interface LintResult {
  file: string;
  valid: boolean;
  error?: string;
  line?: number;
}

function lintJson(content: string): { valid: boolean; error?: string; line?: number } {
  try {
    JSON.parse(content);
    return { valid: true };
  } catch (e: any) {
    const match = e.message.match(/position (\d+)/);
    let line: number | undefined;
    if (match) {
      const pos = parseInt(match[1]);
      line = content.substring(0, pos).split("\n").length;
    }
    return { valid: false, error: e.message, line };
  }
}

function formatJson(content: string, indent = 2): string {
  return JSON.stringify(JSON.parse(content), null, indent);
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0 || args.includes("--help")) {
    console.log("Usage: json-lint [options] <file...>");
    console.log("  --format    Format and overwrite files");
    console.log("  --indent N  Indentation (default: 2)");
    console.log("  --quiet     Only show errors");
    process.exit(0);
  }
  
  const format = args.includes("--format");
  const quiet = args.includes("--quiet");
  const indentIdx = args.indexOf("--indent");
  const indent = indentIdx >= 0 ? parseInt(args[indentIdx + 1]) : 2;
  const files = args.filter(a => !a.startsWith("--") && (indentIdx < 0 || args.indexOf(a) !== indentIdx + 1));
  
  let hasErrors = false;
  
  for (const file of files) {
    const resolved = path.resolve(file);
    if (!fs.existsSync(resolved)) {
      console.error(`Error: ${file} not found`);
      hasErrors = true;
      continue;
    }
    
    const content = fs.readFileSync(resolved, "utf-8");
    const result = lintJson(content);
    
    if (result.valid) {
      if (!quiet) console.log(`\u2713 ${file}`);
      if (format) {
        fs.writeFileSync(resolved, formatJson(content, indent) + "\n");
        if (!quiet) console.log(`  Formatted with indent=${indent}`);
      }
    } else {
      console.error(`\u2717 ${file}: ${result.error}${result.line ? ` (line ${result.line})` : ""}`);
      hasErrors = true;
    }
  }
  
  process.exit(hasErrors ? 1 : 0);
}

main();
