// lib/SafeSanitizer.ts
// Purpose: sanitize *plain* inputs (form fields, query params) before you touch DB code.
// Notes: still use parameterized queries in TypeORM—this is defense-in-depth.

export type SanitizerOptions = {
  maxLen?: number;                 // max output length
  collapseWhitespace?: boolean;    // collapse multiple spaces/tabs/newlines
  stripZeroWidth?: boolean;        // remove zero-width/invisible chars
  stripAngleBrackets?: boolean;    // drop < and > outright
  removeSqlDelimiters?: boolean;   // remove ; -- /* */ multi-statement/comment tokens
  neutralizeScriptTags?: boolean;  // remove obfuscated <script>...</script>
  neutralizeJsProtocols?: boolean; // remove javascript:, data:text/html, vbscript:
  aggressiveSqlKeywords?: boolean; // remove obfuscated SELECT/UNION/etc (may false-positive)
};

export class SafeSanitizer {
  private opts: Required<SanitizerOptions>;

  constructor(options: SanitizerOptions = {}) {
    this.opts = {
      maxLen: options.maxLen ?? 500,
      collapseWhitespace: options.collapseWhitespace ?? true,
      stripZeroWidth: options.stripZeroWidth ?? true,
      stripAngleBrackets: options.stripAngleBrackets ?? true,
      removeSqlDelimiters: options.removeSqlDelimiters ?? true,
      neutralizeScriptTags: options.neutralizeScriptTags ?? true,
      neutralizeJsProtocols: options.neutralizeJsProtocols ?? true,
      aggressiveSqlKeywords: options.aggressiveSqlKeywords ?? false,
    };
  }

  /** Sanitize a single value to a safe, plain string. */
  sanitize(value: unknown): string {
    if (typeof value !== "string") return "";

    let s = value;

    // 1) Normalize Unicode (NFKC reduces many confusables to canonical form)
    s = s.normalize("NFKC");

    // 2) Strip control chars (except \n \t \r)
    s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");

    // 3) Remove zero-width & invisibles (ZWSP/ZWNJ/ZWJ/BOM, etc.)
    if (this.opts.stripZeroWidth) {
      s = s.replace(/[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g, "");
    }

    // 4) Kill obfuscated <script>...</script> (we’re not rendering HTML anyway)
    if (this.opts.neutralizeScriptTags) {
      // match: < s c r i p t ... > ... </ s c r i p t >
      const scr = /<\s*s(?:\W|_)*c(?:\W|_)*r(?:\W|_)*i(?:\W|_)*p(?:\W|_)*t\b[^>]*>[\s\S]*?<\s*\/\s*s(?:\W|_)*c(?:\W|_)*r(?:\W|_)*i(?:\W|_)*p(?:\W|_)*t\s*>/gi;
      s = s.replace(scr, "");
    }

    // 5) Neutralize javascript:/vbscript:/data:text/html URIs (common in copy-paste)
    if (this.opts.neutralizeJsProtocols) {
      // allow http/https/mailto only; strip "javascript:" even with spaces or comments between
      const proto = /(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t|v\s*b\s*s\s*c\s*r\s*i\s*p\s*t|d\s*a\s*t\s*a)\s*:/gi;
      s = s.replace(proto, "");
    }

    // 6) Remove SQL multi-statement/comment tokens
    if (this.opts.removeSqlDelimiters) {
      // Remove /* ... */ comments
      s = s.replace(/\/\*[\s\S]*?\*\//g, "");
      // Remove -- comments to end of line
      s = s.replace(/--[^\r\n]*/g, "");
      // Remove stray statement separators
      s = s.replace(/[;]/g, "");
    }

    // 7) (Optional) Remove obfuscated SQL *keywords* (can over-clean legit text)
    if (this.opts.aggressiveSqlKeywords) {
      const keywords = [
        "SELECT", "INSERT", "UPDATE", "DELETE", "DROP",
        "ALTER", "CREATE", "TRUNCATE", "EXEC", "EXECUTE",
        "MERGE", "UNION", "INTERSECT"
      ];
      const pattern = keywords
        .map(kw => kw.split("").join("(?:\\s|[^\\p{L}\\p{N}]){0,3}")) // allow noise between letters
        .join("|");
      const re = new RegExp(`\\b(?:${pattern})\\b`, "giu");
      s = s.replace(re, "");
    }

    // 8) Remove angle brackets entirely for plain inputs (no HTML expected)
    if (this.opts.stripAngleBrackets) {
      s = s.replace(/[<>]/g, "");
    }

    // 9) Collapse whitespace & trim
    if (this.opts.collapseWhitespace) {
      s = s.replace(/\s+/g, " ").trim();
    } else {
      s = s.trim();
    }

    // 10) Hard length cap
    if (s.length > this.opts.maxLen) {
      s = s.slice(0, this.opts.maxLen);
    }

    return s;
  }

  /** Sanitize all string fields in any object/array shape (deep). */
  sanitizeDeep<T>(input: T): T {
    if (Array.isArray(input)) {
      return input.map(v => this.sanitizeDeep(v)) as unknown as T;
    }
    if (input && typeof input === "object") {
      const out: Record<string, any> = {};
      for (const [k, v] of Object.entries(input as Record<string, any>)) {
        out[k] = this.sanitizeDeep(v);
      }
      return out as T;
    }
    if (typeof input === "string") {
      return this.sanitize(input) as unknown as T;
    }
    return input;
  }

  /** Escape a sanitized string for safe SQL LIKE with ESCAPE '\\' */
  escapeForLike(value: string) {
    const s = this.sanitize(value);
    return s.replace(/([%_\\])/g, "\\$1");
  }
}
