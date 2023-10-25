import { input } from "npm:@inquirer/prompts";
import select from "npm:@inquirer/select";
import * as toml from "https://deno.land/std@0.204.0/toml/mod.ts";
import { format } from "https://deno.land/std@0.204.0/datetime/mod.ts";
import { slugify } from "https://deno.land/x/slugify/mod.ts";
import { join } from "https://deno.land/std@0.204.0/path/mod.ts";

// deno run --allow-sys --allow-read --allow-write new-blog.ts

const date = format(new Date(), "yyyy-MM-dd HH:mm:ss");
const title = await input({ message: "Blog post title     :" });
if (!title) {
  console.error("No title specified");
  Deno.exit(1);
}

const description = await input({ message: "Post description    :" });
const banner_image = await input({ message: "Banner image URL    :" });
const tags = await input({ message: "Comma-separated tags:" });
const section = await select({
  message: "Section",
  choices: [
    { name: "Blog", value: "blog", description: "The default blog" },
    {
      name: "Fiction",
      value: "fiction",
      description: "Alphabetical fiction posts",
    },
  ],
});
console.log("Hit enter, Inquiry is stupid");

const taxonomies = tags ? { taxonomies: { tags: tags.split(",") } } : {};
const extra = banner_image ? { extra: { banner_image } } : {};

const frontmatter = {
  title,
  description,
  date,
  authors: ["astralfrontier"],
  ...taxonomies,
  ...extra,
};

const filename = join("content", section, `${slugify(title).toLowerCase()}.md`);
const text = `+++\n${toml.stringify(frontmatter)}+++\n\nNew blog post.`;

await Deno.writeTextFile(filename, text);
console.log(`Wrote ${filename}`);

Deno.exit(0);
