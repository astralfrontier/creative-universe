// deno run --allow-net og.ts <url>

import * as cheerio from "https://esm.sh/cheerio"
import * as yaml from "https://deno.land/std@0.204.0/yaml/mod.ts";

const datalist = []

for (let url: string of Deno.args) {
    const response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)

    const data = {}
    for (let attr of ["title", "description", "url", "image"]) {
        data[attr] = $(`meta[property="og:${attr}"]`).attr("content")
    }

    // TODO: download site image

    datalist.push(data)
}

console.log(yaml.stringify(datalist))
