const Image = require("@11ty/eleventy-img");
const parseShortDate = (shortDate) => {
    const [month, year] = shortDate.split("/");
    return new Date(parseInt(year), parseInt(month));
}

const defaultSizes = `
    (max-width: 300px) 300px,
    (max-width: 600px) 600px,
    (max-width: 1000px) 1000px,
    (max-width: 1440px) 1440px,
    (max-width: 2500px) 2500px,
    (min-width: 2500px) 3840px
`;
const imageShortcode = (src, alt, cls, sizes = defaultSizes, widths = [300, 600, 1000, 1440, 2500, 3840]) => {
    let options = {
        widths: widths,
        formats: ['jpeg'],
        outputDir: "./_site/img",
    };

    // generate images, while this is async we don’t wait
    Image(src, options);

    let imageAttributes = {
        class: cls,
        alt,
        sizes,
        decoding: "async",
    };
    // get metadata even the images are not fully generated
    let metadata = Image.statsSync(src, options);
    return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) { 
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy("src/fonts")
    eleventyConfig.addPassthroughCopy("scripts");
    eleventyConfig.setDataDeepMerge(true);
    eleventyConfig.setFrontMatterParsingOptions({ excerpt: true });
 

    eleventyConfig.addFilter('date', (dateObj) => 
        new Date(dateObj)
            .toLocaleDateString("en-GB", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            })
    );

    eleventyConfig.addFilter('longDate', (dateStr) =>
       parseShortDate(dateStr)
        .toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
        })
    );

    eleventyConfig.addFilter('urlDate', (dateStr) => {
        const date = parseShortDate(dateStr);

        return `${date.getMonth() + 1}/${date.getFullYear()}`;
    });

    eleventyConfig.addFilter('sortedByDate', (posts) =>
        [...posts].sort((a, b) => (new Date(b.data.date).valueOf()) - (new Date(a.data.date).valueOf()))
    );


    eleventyConfig.addFilter('filterDrafts', posts => posts.filter(p => !p.data.tags.includes("draft")));

    eleventyConfig.addShortcode("image", imageShortcode);

    eleventyConfig.addCollection('categories', collectionApi => {
        const posts = collectionApi.getFilteredByTag("posts").filter(p => !p.data.tags.includes("draft"));
        const categories =  posts.reduce((acc, post) => {
            post.data.tags.filter(tag => tag !== 'posts').forEach(tag => {
                if (!acc[tag]) {
                    acc[tag] = 0;
                }
                acc[tag]++;
            });
            return acc;
        }, {"All posts": posts.length});

        return Object.entries(categories).sort(([aKey, aVal], [bKey, bVal]) => {
            if (aKey === "All posts") {
                return -1;
            }
            
            if(bKey === "All posts") {
                return 1;
            }

            return parseInt(bVal) - parseInt(aVal);
        }).reduce((acc, val) => {
            acc[val[0]] = val[1];
            return acc;
        }, {});
    });

    eleventyConfig.addCollection('postDates', collectionApi => {
        const posts = collectionApi.getFilteredByTag("posts").filter(p => !p.data.tags.includes("draft"));

        return posts.sort((a, b) => b.date - a.date).reduce((acc, post) => {
            const key = `${post.date.getMonth()}/${post.date.getFullYear()}`;

            if (!acc[key]) {
                acc[key] = 1;
            } else {
                acc[key]++;
            }
            return acc;
        }, {});
    });

    return {
        passthroughFileCopy: true,
        dataTemplateEngine: false,
        markdownTemplateEngine: "njk",

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: "njk",
         dir: {
             input: "src",
             includes: "_includes",
             data: "_data",
             output: "_site"
        }
    };
};