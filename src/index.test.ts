import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

const cli = "npx ts-node src/index.ts";

describe("json-lint-cli", () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "json-lint-"));
  
  it("validates valid JSON", () => {
    const f = path.join(tmpDir, "valid.json");
    fs.writeFileSync(f, '{"key": "value"}');
    const out = execSync(`${cli} ${f}`).toString();
    expect(out).toContain("valid.json");
  });

  it("detects invalid JSON", () => {
    const f = path.join(tmpDir, "invalid.json");
    fs.writeFileSync(f, "{bad json}");
    try {
      execSync(`${cli} ${f}`);
    } catch (e: any) {
      expect(e.status).toBe(1);
    }
  });
});
