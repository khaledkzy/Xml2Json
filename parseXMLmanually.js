const axios = require("axios");


async function getXmlmanually() {
    const result = await axios({
        method: "get",
        url: "https://s3-eu-west-1.amazonaws.com/simplexmldata/data.xml",
        responseType: "text"
    });

    return result;
}

// getXmlmanually().then(data => {
//     console.log(data);
// });



const xml = "<a><b>crap</b></a>"

function xmlToJson(xml) {
    if(calls > 10000) {
      return;
    }
    if(!xml) {
      return [];
    }
    let indexToStartAt = xml.search(/<[A-Z]/);
    let hasNext = true;
    const elements = [];
    while(hasNext && calls < 10000) {
      calls+=1;
      const firstPar = xml.indexOf('<', indexToStartAt);
      const firstSpace = xml.indexOf(' ', firstPar);
      const matchingPar = xml.indexOf('>', firstPar);

      const elementEndsAt = firstSpace > -1 ? firstSpace : matchingPar;
      const tagName = xml.substring(firstPar + 1, elementEndsAt);

      const closingTag = `</${tagName}>`; // </A>
      const startClosingIndex = xml.indexOf(closingTag);
      const children = xml.substring(matchingPar + 1, startClosingIndex)
      .trim()
      .replace(' ', '')
      .replace('\n','')
      .replace(' ','');
     
      const parsedChildren = xmlToJson(children);

      indexToStartAt = startClosingIndex + closingTag.length;
      hasNext =  xml.indexOf('<', indexToStartAt) > -1;
      elements.push({
        tagName,
        children: parsedChildren,
        attributes: []
      });
    }


    // console.log(elements);
    return elements;
  }

  // xmlToJson(test);



module.exports = {};

/*

const mockXml = "

<A atr1='11' atr2='22'>
    <B></B>
    <C></C>
</A>

"


*/