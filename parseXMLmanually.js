const axios = require("axios");
async function getXmlmanually() {
    const result = await axios({
        method: "get",
        url: "https://s3-eu-west-1.amazonaws.com/simplexmldata/data.xml",
        responseType: "text"
    })
       let parsedXML = await xmlToJson(result.data);
       console.log('>>>>Result of the function, ', parsedXML)
       return parsedXML
           // .catch(err => console.log(err))
}

function xmlToJson(xml) {
    xml = xml.trim();
    if (!xml) {
        return [];
    }
    let indexToStartAt = xml.search(/<[A-Z]/);
    let hasNext = true;
    let elements = {};
    while (hasNext) {
        const firstOpeningBracket = xml.indexOf("<", indexToStartAt);
        const firstSpace = xml.indexOf(" ", firstOpeningBracket);
        const matchingClosingBracket = xml.indexOf(">", firstOpeningBracket);
        let rawAttributes = [];
        if (firstSpace < matchingClosingBracket) {
            rawAttributes = xml
                .substring(firstSpace + 1, matchingClosingBracket)
                .split('" ');
        }
        const attributes = parseAttributes(rawAttributes);
        const elementEndsAt = minNonNegative(firstSpace, matchingClosingBracket);
        const tagName = xml.substring(firstOpeningBracket + 1, elementEndsAt); // Child
        const closingTag = `</${tagName}>`; // </Child>
        const closingTagIndex = xml.indexOf(closingTag, matchingClosingBracket);
        const rawChildren = xml.substring(
            matchingClosingBracket + 1,
            closingTagIndex
        );
        const parsedChildren = xmlToJson(rawChildren);
        indexToStartAt = closingTagIndex + closingTag.length;
        hasNext = xml.indexOf("<", indexToStartAt) > -1;
        elements = {
            ...elements,
            [tagName]: {
                ...(attributes && { $attributes$: attributes }),
                ...parsedChildren
            }
        };
    }
    return elements;
}

function parseAttributes(rawAttributes) {
    return rawAttributes.reduce((total, attr) => {
        const values = attr.split("=").map(x => x.replace(/"/g, ""));
        return {
            ...total,
            [values[0]]: values[1]
        };
    }, undefined);
}

function minNonNegative(...values) {
    const nonNegative = values.filter(x => x > -1);
    return Math.min(...nonNegative);
}

module.exports = getXmlmanually

