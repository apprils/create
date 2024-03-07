import mustache from "mustache";

// disabling escape
mustache.escape = (s) => s;

export function render(template: string, context: object): string {
  return mustache.render(template, { ...context });
}
